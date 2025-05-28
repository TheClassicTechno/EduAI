// index.js — CommonJS version
const express     = require('express');
const fs          = require('fs');
const path        = require('path');
const { exec }    = require('child_process');
const handlebars  = require('handlebars');
const bodyParser  = require('body-parser');

const app  = express();
const PORT = 3001;

// make sure ./temp exists
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

app.use(bodyParser.json());

app.post('/generate-resume', (req, res) => {
  const data = req.body;                       // { education, activities }

  try {
    // 1. read & render template
    const tplPath = path.join(__dirname, 'templates', 'resume_template.tex');
    const tplSrc  = fs.readFileSync(tplPath, 'utf-8');
    const latex   = handlebars.compile(tplSrc)({ data });

    // 2. write rendered .tex
    const texFile = path.join(tempDir, 'resume.tex');
    fs.writeFileSync(texFile, latex);

    // 3. compile to PDF with pdflatex
    exec(`pdflatex -interaction=nonstopmode -output-directory=${tempDir} ${texFile}`, (err) => {
      if (err) {
        console.error('LaTeX error:', err);
        return res.status(500).send('LaTeX compilation failed');
      }
      const pdfFile = path.join(tempDir, 'resume.pdf');
      res.download(pdfFile, 'resume.pdf');     // triggers download
    });
  } catch (e) {
    console.error('Server error:', e);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Resume generator server listening on http://localhost:${PORT}`);
});
