import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	width: 90%;
	height: 220px;
	flex-direction: column;
	justify-content: center;
`;
const Div = styled.div`
	display: flex;
	width: 100%;
	height: 60px;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 10px;
`;
const Input = styled.input`
	width: 100%;
	height: 25px;
	font-size: medium;
	background-color: #eee;
	border: 1px solid grey;
	border-radius: 5px;
`;
const Button = styled.button`
	width: 100%;
	height: 35px;
	background-color: blue;
	color: white;
	font-size: large;
	border: none;
	border-radius: 5px;
`;
const GuestButton = styled(Button)`
	width: 90%;
`;

export default function LogIn() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const { login, guestLogin } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (error) {
			return setError("could not sign in");
		}
	}
	async function handleGuest() {
		try {
			setError("");
			await guestLogin();
			history.push("/");
		} catch (error) {
			return setError("could not sign in");
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				{error && <p>{error}</p>}
				<Div className='form-group'>
					<label htmlFor='logInEmail'> Email</label>
					<Input id='logInEmail' type='email' ref={emailRef} required />
				</Div>
				<Div className='form-group'>
					<label htmlFor='logInPassword'> password</label>
					<Input
						id='logInPassword'
						type='password'
						ref={passwordRef}
						required
					/>
				</Div>
				<Div className='form-group'>
					<Button id='logInButton'>Log In</Button>
					<p>
						You don't have an account? <Link to='/signup'>Sign Up</Link>{" "}
					</p>
				</Div>
			</Form>
			<GuestButton onClick={handleGuest}>Play as Guest</GuestButton>
		</>
	);
}
