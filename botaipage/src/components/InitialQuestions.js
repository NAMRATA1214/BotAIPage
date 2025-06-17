import React, { useContext } from 'react'
import { LightThemeContext } from '../contexts/ThemeContext'

export default function InitialQuestions({
  isMobile,
  initialQuestions,
  handleQuestionClick }) {

  const { lightTheme } = useContext(LightThemeContext)
  return (
    <div className="initial-questions">
      <div className='welcome-section'>
        <p>How Can I Help You Today?</p>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className='questions' style={{
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : 'unset',
        gap: isMobile ? '10px' : '14px',
      }}>
        {initialQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question)}
            className="question-button"
            style={{ fontSize: isMobile ? '10px' : '16px', background: !lightTheme && '#3a2261', color: !lightTheme && 'white' }}
          >
            <p > {question}</p>
            <p style={{ color: !lightTheme && '#8e78b0'}}>Get immediate AI generated response</p>

          </button>
        ))}
      </div>

    </div>
  )
}
