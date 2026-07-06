import React from 'react'
import logo from '../assets/logo.jpg'
import './Pages.css'

function Header({ username = 'User' }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="logo" className="header-logo" />
      </div>
      <div className="header-right">
        <span className="header-username">{username}</span>
      </div>
    </header>
  )
}

export default Header
