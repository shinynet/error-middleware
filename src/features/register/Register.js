import React, {useState} from 'react'
import clsx from 'clsx'

const Register = props => {
	const {register, snack} = props

	const [email, setEmail] = useState('')
	const handleEmailChange = event => {
		setEmail(event.target.value)
	}

	const [password, setPassword] = useState('')
	const handlePasswordChange = event => {
		setPassword(event.target.value)
	}

	const handleRegister = () => {
		register(email, password)
			// Since the async action in registerSlice
			// returns the promise, calling code is also
			// given the opportunity to do something with
			// resolved or rejected operations.
			.then(result => {
				// debugger
			})
			.catch(() => {
				setEmail('')
				setPassword('')
			})
	}

	return (
			<div className="section">
				<h1 className="title">Register</h1>
				<div className="field">
					<div className="control has-icons-left">
						<input
							className="input"
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}/>
						<span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
					</div>
				</div>

				<div className="field">
					<p className="control has-icons-left">
						<input
							className="input"
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}/>
    				<span className="icon is-small is-left"><i className="fas fa-lock"/></span>
					</p>
				</div>

				<div className="field">
					<p className="control">
						<button className="button is-success" onClick={handleRegister}>
							Register
						</button>
					</p>
				</div>

				{snack.message && (
					<article className={clsx('message', snack.type)}>
						<div className="message-body">{snack.message}</div>
					</article>
				)}

				<div className="box">
					email: eve.holt@reqres.in<br/>
					password: pistol
				</div>
		</div>
	)
}

export default Register