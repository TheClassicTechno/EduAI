// downloadHelpers.js

/**
 * Download feedback in text format
 * @param {string} essayTitle - The title of the essay
 * @param {string} essayText - The original essay text
 * @param {string} feedback - The feedback content
 */
export const downloadAsTxt = (essayTitle, essayText, feedback) => {
  const fileName = getFileName(essayTitle);
  const textContent = `
Essay Title: ${essayTitle} 
--- ORIGINAL ESSAY ---
${essayText}

--- FEEDBACK ---
${feedback}`;
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  downloadBlob(blob, `${fileName}.txt`);
};

/**
 * Download feedback in DOC format
 * @param {string} essayTitle - The title of the essay
 * @param {string} essayText - The original essay text
 * @param {string} feedback - The feedback content
 */
export const downloadAsDoc = (essayTitle, essayText, feedback) => {
  const fileName = getFileName(essayTitle);
  const docContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Feedback for ${essayTitle}</title>
    </head>
    <body>
      <h1>Feedback for "${essayTitle}"</h1>
      <h2>Original Essay</h2>
      <div class="essay">${essayText.replace(/\n/g, '<br>')}</div>
      <h2>Feedback</h2>
      <div class="feedback">${feedback.replace(/\n/g, '<br>')}</div>
    </body>
    </html>
  `;
  
  const blob = new Blob([docContent], { type: 'application/msword' });
  downloadBlob(blob, `${fileName}.doc`);
};

/**
 * Download feedback in PDF format
 * @param {string} essayTitle - The title of the essay
 * @param {string} essayText - The original essay text
 * @param {string} feedback - The feedback content
 */
export const downloadAsPdf = (essayTitle, essayText, feedback) => {
  try {
    // Step 1: Load the PDF library dynamically
    import('jspdf').then(({ jsPDF }) => {
      // Step 2: Set up the PDF document and filename
      const fileName = getFileName(essayTitle);
      const doc = new jsPDF(); // Creates a new blank PDF document
      let yPosition = 20; // Start 20 points from the top of the page
      
      // Step 3: Add the title to the PDF
      doc.setFontSize(18); // Set larger font for title
      const titleText = `Feedback for "${essayTitle}"`;
      const splitTitle = doc.splitTextToSize(titleText, 170); // Split title if it's too long
      doc.text(splitTitle, 20, yPosition); // Position title text 20 points from left
      
      // Step 4: Update our vertical position after adding title
      // Move down based on how many lines the title took up
      yPosition += splitTitle.length * 10;
      
      // Step 5: Add the "Original Essay" header
      yPosition += 10; // Add some extra space 
      doc.setFontSize(14); // Smaller font for section header
      doc.text("Original Essay:", 20, yPosition);
      yPosition += 8; // Move down a bit for essay content
      
      // Step 6: Add the essay text
      doc.setFontSize(12); // Even smaller font for main content
      const splitEssay = doc.splitTextToSize(essayText, 170); // Break essay into lines
      doc.text(splitEssay, 20, yPosition); // Add essay text to document
      
      // Step 7: Update vertical position again after essay
      yPosition += splitEssay.length * 7; // For each line, move down 7 points
      
      // Step 8: Add space before feedback section
      yPosition += 5; // This is the space you can reduce
      
      // Step 9: Check if feedback needs to start on a new page
      if (yPosition > 270) { // 270 is near bottom of page
        doc.addPage(); // Add a new page if needed
        yPosition = 20; // Reset position to top of new page
      }
      
      // Step 10: Add feedback header
      doc.setFontSize(14);
      doc.text("Feedback:", 20, yPosition);
      yPosition += 8; // Space after header
      
      // Step 11: Add feedback content
      doc.setFontSize(12);
      const splitFeedback = doc.splitTextToSize(feedback, 170);
      doc.text(splitFeedback, 20, yPosition);
      
      // Step 12: Save the completed PDF
      doc.save(`${fileName}.pdf`);
    });
  } catch (error) {
    console.error("Error with PDF generation:", error);
    alert("PDF generation requires the jsPDF library.");
  }
};

// Helper function to create a valid filename from the essay title
const getFileName = (essayTitle) => {
  return `feedback-${essayTitle.replace(/\s+/g, '-').toLowerCase() || 'essay'}`;
};

// Helper function to download a blob
const downloadBlob = (blob, fileName) => {
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = fileName;
  
  // Append to the document, click, and clean up
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};