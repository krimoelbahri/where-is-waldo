import React from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 90%;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const FlexC = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;
const FlexR = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
`;
const ScoreBoardsContainer = styled(FlexR)`
	width: 90%;
	height: 40%;
`;

export default function ScoreBoard() {
	return (
		<Container>
			<div>
				<h1>Score Board</h1>
			</div>
			{/*TODO: import map name */}
			<div>
				<h1>Map Name</h1>
			</div>
			<ScoreBoardsContainer>
				<FlexC></FlexC>
				<FlexC></FlexC>
				<FlexC></FlexC>
			</ScoreBoardsContainer>
		</Container>
	);
}
