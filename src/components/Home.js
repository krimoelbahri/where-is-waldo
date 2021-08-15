import React from "react";
import LogIn from "./LogIn";
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

export default function Home() {
	return (
		<Container>
			<Title>Sign in to play</Title>
			<LogIn />
		</Container>
	);
}
