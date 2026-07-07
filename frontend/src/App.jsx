import React, { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState('login')

  return (
    <>
     <Header username="User" />
      {page === 'login' && <LoginPage onSwitchToCreate={() => setPage('create')} />}
      {page === 'create' && <CreateAccount onSwitchToLogin={() => setPage('login')} />} 
    <div className="app-shell">
     
      <main className="app-main">
        <h1>Welcome</h1>
        <p>This is our Telecom Support app.</p>
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App;
