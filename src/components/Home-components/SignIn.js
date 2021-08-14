import React from "react";

export default function SignIn() {
	return (
		<>
			<form>
				<div className='form-group'>
					<label htmlFor='SignInEmail'> Email</label>
					<input id='SignInEmail' type='email' />
				</div>
				<div className='form-group'>
					<label htmlFor='SignInPassword'> password</label>
					<input id='SignInPassword' type='password' />
				</div>
				<div className='form-group'>
					<button id='SignInButton'>Sign IN</button>
				</div>
			</form>
		</>
	);
}
