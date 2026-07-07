import React, { useState, useEffect } from 'react';
import './LoginPage.css'
import { isEmailValid, isStrongPassword } from './LoginValidations'

export default function LoginPage({ onSwitchToCreate }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [errors, setErrors] = useState({ email: '', password: '' });

	useEffect(() => {
		const saved = localStorage.getItem('telecom_remember');
		if (saved) {
			try {
				const obj = JSON.parse(saved);
				setEmail(obj.email || '');
				setRemember(!!obj.remember);
			} catch (e) {
				// ignore
			}
		}
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		// validations
		const emailErr = isEmailValid(email) ? '' : 'Enter a valid email (example@domain.com)'
		const passErr = isStrongPassword(password)
			? ''
			: 'Password must include uppercase, lowercase, number, and special character, and be at least 8 characters long'

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

		// TODO: replace with real authentication call
		console.log('Login attempt', { email, password, remember });
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

				<button type="submit" className="login-button">Login</button>

				<div className="register">
					Not registered?{' '}
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault()
							if (onSwitchToCreate) onSwitchToCreate()
							else window.location.href = '/register'
						}}
					>
						Create an account
					</a>
				</div>
			</form>
		</div>
	);
}
