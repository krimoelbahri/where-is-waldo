import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";

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
	align-items: flex-start;
	justify-content: space-evenly;
`;
const ScoreBoardsContainer = styled(FlexR)`
	width: 90%;
	height: 40%;
`;

export default function ScoreBoard() {
	const { getScoreData } = useData();
	const [scoreArray, setScoreArray] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchScoreData() {
			const array = await getScoreData("Map1scoreboard", "easy");
			console.log(array);
			setScoreArray(array);
			setLoading(false);
		}
		fetchScoreData();
	}, [getScoreData]);
	return (
		<Container>
			<div>
				<h1>Score Board</h1>
			</div>
			{/*TODO: import map name */}
			<div>
				<h1>Map Name</h1>
			</div>

			{!loading && (
				<ScoreBoardsContainer>
					<FlexC>
						{scoreArray.map((user, i) => {
							return (
								<FlexR key={`map${i}`}>
									<div>{user.name}:</div>
									<div>{user.time}</div>
								</FlexR>
							);
						})}
					</FlexC>
				</ScoreBoardsContainer>
			)}
		</Container>
	);
}
