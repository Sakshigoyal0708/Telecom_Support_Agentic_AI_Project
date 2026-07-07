import React from 'react'
import logo from '../assets/logo.png'
import './Pages.css'

function Header({ username = 'User' }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="logo" className="header-logo" />
      </div>
      <div className="header-right">
        <div className="user-badge">
          <span className="user-icon">👤</span>
          <span className="header-username">{username}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
