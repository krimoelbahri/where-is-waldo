import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
	border: 1px solid grey;
	min-width: 300px;
	height: 350px;
	justify-content: center;
`;
const Title = styled.h2`
	display: flex;
	align-items: center;
	height: 30px;
	text-align: center;
	font-weight: bold;
	font-size: large;
	flex-direction: row;
`;
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

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			await login(emailRef.current.value, passwordRef.current.value);
		} catch (error) {
			return setError("could not sign in");
		}
	}
	async function handleGuest() {
		try {
			setError("");
			await guestLogin();
		} catch (error) {
			return setError("could not sign in");
		}
	}

	return (
		<Container>
			<Title>Sign in to play</Title>
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
		</Container>
	);
}
