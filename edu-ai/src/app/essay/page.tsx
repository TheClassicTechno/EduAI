'use client'

import { useState } from 'react'
import Link from 'next/link'
import './essay_test.css'  

export default function EssayFeedbackPage() {
  const [essayTitle, setEssayTitle] = useState('')
  const [essayText, setEssayText] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateFeedback = () => {
    setIsGenerating(true)

    // Simulating API call or processing delay
    setTimeout(() => {
      // Mock feedback generation - in a real app, this would call an API
      const generatedFeedback = `
Feedback for "${essayTitle}":

STRUCTURE:
- Strong introduction that clearly states the thesis
- Body paragraphs are well-organized
- Consider strengthening your conclusion to reinforce key points

CONTENT:
- Good use of examples to support your arguments
- Consider adding more counterarguments to strengthen your position
- Some claims would benefit from additional evidence

LANGUAGE:
- Clear and concise writing style
- Watch for passive voice in paragraphs 2 and 4
- Consider varying sentence structure for better flow

OVERALL:
This essay effectively addresses the topic with good organization and evidence. 
Focus on strengthening your conclusion and incorporating more diverse viewpoints.

GRADE ESTIMATE: B+
      `

      setFeedback(generatedFeedback)
      setIsGenerating(false)
    }, 1500)
  }

  const handleDownloadFeedback = () => {
    if (!feedback) return

    const element = document.createElement('a')
    const file = new Blob([`Essay Title: ${essayTitle}\n\n${feedback}`], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(file)
    element.download = `feedback-${
      essayTitle.replace(/\s+/g, '-').toLowerCase() || 'essay'
    }.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className='app-container'>
      <header className='header'>
        <div className='header-container'>
          <div className='logo-container'>
            <Link href='/' className='edu-logo'>
              <span className='edu-icon'>👨‍🎓</span>
              <span className='edu-text'>EDU AI</span>
            </Link>
            <div className='durham-logo'>
              <span>DURHAM</span>
            </div>
          </div>

          <div className='header-actions'>
            <Link href='/' className='header-button'>
              HOME
            </Link>
            <button className='header-button'>HELP</button>
          </div>
        </div>
      </header>

      <div className='banner'>
        <div className='banner-container'>
          <h1 className='banner-title'>ESSAY FEEDBACK GENERATOR</h1>
        </div>
      </div>

      
      <div className='main-container'>
        <div className='two-column-container'>
          {/* Left column - Input section */}
          <div className='column-container'>
            <div className='input-section'>
              <div className='input-container-title'>
                <label htmlFor='essay-title' className='input-label'>
                  Essay Title
                </label>
                <input
                  id='essay-title'
                  type='text'
                  value={essayTitle}
                  onChange={(e) => setEssayTitle(e.target.value)}
                  className='title-input'
                  placeholder='Enter your essay title here...'
                />
              </div>

              <div className='input-container-essay'>
                <label htmlFor='essay-text' className='input-label'>
                  Essay Text
                </label>
                <textarea
                  id='essay-text'
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  className='essay-input'
                  placeholder='Paste your essay text here...'
                />
              </div>

              <div className='input-actions'>
                <button
                  className={`generate-button ${
                    isGenerating ? 'generating' : ''
                  }`}
                  onClick={handleGenerateFeedback}
                  disabled={isGenerating || !essayText.trim()}
                >
                  {isGenerating ? 'Generating...' : 'Generate Feedback'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Output section */}
          <div className='column-container'>
            <div className='output-section'>
              <div className='output-container'>
                <div className='output-header'>
                  <h2 className='output-title'>Feedback</h2>
                  {feedback && (
                    <button
                      className='download-button'
                      onClick={handleDownloadFeedback}
                    >
                      Download
                    </button>
                  )}
                </div>

                <div className='feedback-output'>
                  {feedback ? (
                    <pre className='feedback-content'>{feedback}</pre>
                  ) : (
                    <div className='feedback-placeholder'>
                      <div className='placeholder-icon'>🔍</div>
                      <p className='placeholder-text'>
                        Your feedback will appear here after you generate it.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}