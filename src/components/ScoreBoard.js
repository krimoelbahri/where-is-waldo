import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";
import { useMapData } from "../context/MapDataContext";

const Container = styled.div`
	width: 90%;
	height: 80%;
	margin: 20px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
const FlexC = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;
const FlexR = styled.div`
	width: 40%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
`;
const ScoreBoardsContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-evenly;
	font-size: large;
	font-weight: bold;
`;

export default function ScoreBoard() {
	const { getScoreData } = useData();
	const { map, difficulty } = useMapData();
	const [scoreArray, setScoreArray] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchScoreData() {
			const array = await getScoreData(`${map}scoreboard`, difficulty);
			setScoreArray(array);
			setLoading(false);
		}
		fetchScoreData();
	}, [getScoreData, difficulty, map]);
	return (
		<Container>
			<div>
				<h1>Score Board</h1>
			</div>
			{/*TODO: import map name */}
			<FlexR style={{ width: "20%" }}>
				<h1>{map}:</h1>
				<h1>{difficulty}</h1>
			</FlexR>

			{!loading && (
				<ScoreBoardsContainer>
					<FlexC>
						{scoreArray.map((user, i) => {
							return (
								<FlexR key={`map${i}`}>
									<div>{user.name}:</div>
									<div>{user.time}"</div>
								</FlexR>
							);
						})}
					</FlexC>
				</ScoreBoardsContainer>
			)}
		</Container>
	);
}
