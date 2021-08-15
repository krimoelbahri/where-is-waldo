import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
	border: 1px solid grey;
	min-width: 300px;
	max-height: 300px;
	justify-content: center;
`;
const Div = styled.div`
	display: flex;
	width: 90%;
	height: 50px;
	flex-direction: column;
	justify-content: space-between;
	margin-bottom: 5px;
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
export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (
			passwordRef.current.value !== passwordConfirmRef.current.value
		) {
			return setError("password didn't match");
		}

		try {
			setError("");
			setIsLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (error) {
			return setError("could not sign up");
		}
		setIsLoading(false);
	}

	return (
		<>
			<Form onSubmit={handleSubmit}>
				{error && <h1>{error}</h1>}
				<Div className='form-group'>
					<label htmlFor='SignUpEmail'> Email</label>
					<Input id='SignUpEmail' type='email' ref={emailRef} required />
				</Div>
				<Div className='form-group'>
					<label htmlFor='SignUpPassword'> Password</label>
					<Input
						id='SignUpPassword'
						type='password'
						ref={passwordRef}
						required
					/>
				</Div>
				<Div className='form-group'>
					<label htmlFor='SignUpConfirmPassword'> Confirm Password</label>
					<Input
						id='SignUpConfirmPassword'
						type='password'
						ref={passwordConfirmRef}
						required
					/>
				</Div>
				<Div className='form-group'>
					<Button disabled={isLoading} id='SignUpButton'>
						Sign Up
					</Button>
				</Div>
				<p>
					already have an account? <Link to='/'>Sign In</Link>
				</p>
			</Form>
		</>
	);
}