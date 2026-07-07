import React from 'react'
import './Pages.css'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">© {new Date().getFullYear()} Telecom Support Agentic AI</div>
      <div className="footer-right">
        <a href="/terms" className="footer-link">Terms</a>
        <span className="footer-sep">|</span>
        <a href="/privacy" className="footer-link">Privacy Policy</a>
      </div>
    </footer>
  )
}

export default Footer