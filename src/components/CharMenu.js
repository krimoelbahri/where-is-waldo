import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: ${(props) => (props.isDisplay ? "flex" : "none")};
	position: absolute;
	left: ${(props) => props.posX + 10}px;
	top: ${(props) => props.posY + 120}px;
	width: 70px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: white;
`;
const Div = styled.div`
	font-size: medium;
	border-bottom: 1px solid;
	cursor: pointer;
	padding: 5px;
	margin-bottom: 5px;
`;
export default function CharMenu(props) {
	return (
		<Container
			isDisplay={props.display}
			posX={props.posX}
			posY={props.posY}>
			{props.charArray.map((char, i) => {
				return (
					<Div key={char + i} onClick={props.checkIfCharFound} id={i}>
						{char[0].name}
					</Div>
				);
			})}
		</Container>
	);
}
