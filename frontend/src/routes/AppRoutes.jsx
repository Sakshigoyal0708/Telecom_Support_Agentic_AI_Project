import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import LoginPage from '../LoginPage'
import CreateAccount from '../CreateAccount'
import DashboardPage from '../components/pages/DashboardPage'
import {
  clearAuthSession,
  getMeApi,
  getStoredToken,
  getStoredUser,
  logoutApi,
  setAuthSession,
} from '../services/authService'

const AuthShell = ({ username, children }) => {
  return (
    <>
      <Header username={username || 'User'} />
      {children}
      <div className="app-shell">
        <main className="app-main" />
        <Footer />
      </div>
    </>
  )
}

const AppRouter = () => {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState(() => getStoredUser())
  const [isBootstrapping, setIsBootstrapping] = useState(() => Boolean(getStoredToken()))

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      return
    }

    getMeApi(token)
      .then((response) => {
        setAuthUser(response.user)
      })
      .catch((error) => {
        console.error('Session restore failed:', error)
        clearAuthSession()
        setAuthUser(null)
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setIsBootstrapping(false)
      })
  }, [navigate])

  function handleAuthSuccess(payload) {
    setAuthSession(payload)
    setAuthUser(payload.user)
    navigate('/dashboard', { replace: true })
  }

  async function handleLogout() {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      clearAuthSession()
      setAuthUser(null)
      navigate('/login', { replace: true })
    }
  }

  if (isBootstrapping) {
    return <div className="app-shell"><main className="app-main">Restoring your session...</main></div>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authUser ? '/dashboard' : '/login'} replace />} />
      <Route
        path="/login"
        element={authUser ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <AuthShell username={authUser?.fullName}>
            <LoginPage
              onSwitchToCreate={() => navigate('/register')}
              onLoginSuccess={handleAuthSuccess}
            />
          </AuthShell>
        )}
      />
      <Route
        path="/register"
        element={authUser ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <AuthShell username={authUser?.fullName}>
            <CreateAccount
              onSwitchToLogin={() => navigate('/login')}
              onRegisterSuccess={handleAuthSuccess}
            />
          </AuthShell>
        )}
      />
      <Route
        path="/dashboard"
        element={authUser ? (
          <DashboardPage authUser={authUser} onLogout={handleLogout} />
        ) : (
          <Navigate to="/login" replace />
        )}
      />
      <Route path="*" element={<Navigate to={authUser ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default AppRoutes
