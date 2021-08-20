import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: ${({ isDisplay }) => (isDisplay ? "flex" : "none")};
	position: absolute;
	left: ${({ posX }) => posX + 30}px;
	top: ${({ posY }) => posY + 120}px;
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
	const { display, posX, posY, charArray, checkIfCharFound } = props;
	return (
		<Container isDisplay={display} posX={posX} posY={posY}>
			{charArray.map((char, i) => {
				return (
					<Div key={char + i} onClick={checkIfCharFound} id={i}>
						{char[0].name}
					</Div>
				);
			})}
		</Container>
	);
}
