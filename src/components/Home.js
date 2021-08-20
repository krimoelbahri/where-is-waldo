import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import styled from "styled-components";
import GameMain from "./GameMain";
import SelectMap from "./SelectMap";

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Home() {
	const [map, setMap] = useState(false);
	const [mapSrc, setMapSrc] = useState("");
	const [mapData, setMapData] = useState();
	const [difficulty, setDifficulty] = useState(false);
	const [loading, setLoading] = useState(true);
	const { getData } = useData();

	async function getMapData() {
		const result = await getData(map, difficulty);
		if (result.exists()) {
			setMapData(result.data());
			setLoading(false);
		} else {
			setMapData("");
			setMap(false);
			setMapSrc("");
			setDifficulty(false);
		}
	}

	useEffect(() => {
		setMap(false);
		setMapSrc("");
		setDifficulty(false);
	}, []);
	useEffect(() => {
		if (map && difficulty) getMapData();
	}, [map, difficulty]);
	return (
		<HomeContainer>
			{(!map || !difficulty) && (
				<SelectMap
					setMap={setMap}
					setMapSrc={setMapSrc}
					setDifficulty={setDifficulty}
				/>
			)}
			{!loading && (
				<GameMain
					setMap={setMap}
					setDifficulty={setDifficulty}
					setLoading={setLoading}
					setMapData={setMapData}
					mapData={mapData}
					imgSrc={mapSrc}
				/>
			)}
		</HomeContainer>
	);
}
