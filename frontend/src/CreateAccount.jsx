import { useState } from 'react'
import './CreateAccount.css'
import { isEmailValid, isStrongPassword, isSingleWordName, isPhoneValid } from './LoginValidations'
import { registerApi } from './services/authService'

export default function CreateAccount({ onSwitchToLogin, onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' })
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setApiError('')
    // validations
    const firstErr = isSingleWordName(firstName) ? '' : 'First name should be a single word (letters only)'
    const lastErr = isSingleWordName(lastName) ? '' : 'Last name should be a single word (letters only)'
    const emailErr = isEmailValid(email) ? '' : 'Enter a valid email (example@domain.com)'
    const phoneErr = isPhoneValid(phone) ? '' : 'Phone must be 10 digits'
    const passErr = isStrongPassword(password) ? '' : 'Password must include uppercase, lowercase, number, and special character, and be at least 8 characters long'

    setErrors({ firstName: firstErr, lastName: lastErr, email: emailErr, phone: phoneErr, password: passErr })
    if (firstErr || lastErr || emailErr || phoneErr || passErr) return

    try {
      setIsSubmitting(true)
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
      const payload = await registerApi({
        fullName,
        email,
        phone,
        password,
      })

      if (onRegisterSuccess) {
        onRegisterSuccess(payload)
      } else if (onSwitchToLogin) {
        onSwitchToLogin()
      }
    } catch (error) {
      console.error('Create account request failed:', error)
      setApiError(error?.response?.data?.error || 'Failed to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-page">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>

        <label className="field">
          <span className="label-text">First name</span>
          <input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          {errors.firstName && <div className="error-text">{errors.firstName}</div>}
        </label>

        <label className="field">
          <span className="label-text">Last name</span>
          <input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          {errors.lastName && <div className="error-text">{errors.lastName}</div>}
        </label>

        <label className="field">
          <span className="label-text">Email</span>
          <input placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </label>

        <label className="field">
          <span className="label-text">Phone no.</span>
          <input placeholder="0123456789" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <div className="error-text">{errors.phone}</div>}
        </label>

        <label className="field">
          <span className="label-text">Password</span>
          <input placeholder="At least 8 characters" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </label>

        <button type="submit" className="create-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
        {apiError && <div className="error-text" role="alert">{apiError}</div>}

        <div className="register">
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => {
              if (onSwitchToLogin) onSwitchToLogin()
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
