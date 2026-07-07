import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './Pages/Header'
import Footer from './Pages/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-shell">
      <Header username="User" />
      <main className="app-main">
        <h1>Welcome</h1>
        <p>This is our Telecom Support app.</p>
      </main>
      <Footer />
    </div>
  )
}

export default App
