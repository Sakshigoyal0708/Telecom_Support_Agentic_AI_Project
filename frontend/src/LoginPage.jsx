import { useState } from 'react';
import './LoginPage.css'
import { isEmailValid } from './LoginValidations'
import { loginApi } from './services/authService'

function getRememberedCredentials() {
	const saved = localStorage.getItem('telecom_remember')
	if (!saved) {
		return { email: '', remember: false }
	}

	try {
		const obj = JSON.parse(saved)
		return {
			email: obj.email || '',
			remember: !!obj.remember,
		}
	} catch (error) {
		console.error('Invalid remember-me data in localStorage:', error)
		return { email: '', remember: false }
	}
}

export default function LoginPage({ onSwitchToCreate, onLoginSuccess }) {
	const remembered = getRememberedCredentials()
	const [email, setEmail] = useState(remembered.email);
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(remembered.remember);
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [apiError, setApiError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setApiError('')
		// validations
		const normalizedEmail = String(email || '').trim()
		const emailErr = isEmailValid(normalizedEmail) ? '' : 'Enter a valid email (example@domain.com)'
		const passErr = password.trim() ? '' : 'Password is required'

		setErrors({ email: emailErr, password: passErr })
		if (emailErr || passErr) return

		if (remember) {
			localStorage.setItem(
				'telecom_remember',
				JSON.stringify({ email, remember: true })
			);
		} else {
			localStorage.removeItem('telecom_remember');
		}

		try {
			setIsSubmitting(true)
			const data = await loginApi({ email: normalizedEmail, password })

			if (onLoginSuccess) {
				onLoginSuccess(data)
			}
		} catch (error) {
			console.error('Login request failed:', error)
			setApiError(error?.response?.data?.error || 'Unable to connect to server. Please ensure backend is running.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="login-page">
			<form className="login-form" onSubmit={handleSubmit}>
				<h2>Telecom Support Login</h2>

				<label className="field">
					<span className="label-text">Email ID</span>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="you@example.com"
					/>
					{errors.email && <div className="error-text">{errors.email}</div>}
				</label>

				<label className="field">
					<span className="label-text">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Enter your password"
					/>
					{errors.password && <div className="error-text">{errors.password}</div>}
				</label>

				<label className="remember">
					<input
						type="checkbox"
						checked={remember}
						onChange={(e) => setRemember(e.target.checked)}
					/>
					<span>Remember me</span>
				</label>

				<button type="submit" className="login-button" disabled={isSubmitting}>
					{isSubmitting ? 'Logging in...' : 'Login'}
				</button>
				{apiError && <div className="error-text" role="alert">{apiError}</div>}

				<div className="register">
					Not registered?{' '}
					<button
						type="button"
						className="link-button"
						onClick={(e) => {
							e.preventDefault()
							if (onSwitchToCreate) onSwitchToCreate()
							else globalThis.location.href = '/register'
						}}
					>
						Create an account
					</button>
				</div>
			</form>
		</div>
	);
}
