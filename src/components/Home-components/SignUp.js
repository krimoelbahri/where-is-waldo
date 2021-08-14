import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");

	function showRef() {
		console.log(passwordRef);
	}
	async function handleSubmit(e) {
		e.preventDefault();
		console.log();
		if (
			passwordRef.current.value !== passwordConfirmRef.current.value
		) {
			return setError("password didn't match");
		}
		try {
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch (error) {
			return setError(error);
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				{error && <h1>{error}</h1>}
				<div className='form-group'>
					<label htmlFor='SignUpEmail'> Email</label>
					<input id='SignUpEmail' type='email' ref={emailRef} required />
				</div>
				<div className='form-group'>
					<label htmlFor='SignUpPassword'> Password</label>
					<input
						id='SignUpPassword'
						type='password'
						ref={passwordRef}
						onChange={showRef}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='SignUpConfirmPassword'> Confirm Password</label>
					<input
						id='SignUpConfirmPassword'
						type='password'
						ref={passwordConfirmRef}
						required
					/>
				</div>
				<div className='form-group'>
					<button id='SignUpButton'>Sign IN</button>
				</div>
			</form>
		</>
	);
}
