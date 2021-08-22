import React, { useEffect } from "react";
import { useData } from "../context/DataContext";
import { useMapData } from "../context/MapDataContext";
import styled from "styled-components";
import GameMain from "./home_component/GameMain";
import SelectMap from "./home_component/SelectMap";

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Home() {
	const { getData } = useData();
	const {
		map,
		setMap,
		setMapImgSrc,
		setMapData,
		difficulty,
		setDifficulty,
		loading,
		setLoading,
	} = useMapData();

	useEffect(() => {
		async function fetchMapData() {
			const result = await getData(map, difficulty);
			if (result.exists()) {
				setMapData(result.data());
				setLoading(false);
			} else {
				setLoading(true);
				setMapData([]);
				setMap("");
				setMapImgSrc("");
				setDifficulty("");
			}
		}
		if (map && difficulty) fetchMapData();
	}, [
		map,
		difficulty,
		getData,
		setDifficulty,
		setMapImgSrc,
		setMap,
		setMapData,
		setLoading,
	]);

	//Rendering Loading component
	if (map && difficulty && loading) {
		return (
			<HomeContainer>
				<h1>LOADING ...!</h1>
			</HomeContainer>
		);
	}

	//rendering main Game component when loading is done
	if (!loading) {
		return (
			<HomeContainer>
				<GameMain />
			</HomeContainer>
		);
	}

	//rendering Select Map and difficulty component
	if (!map || !difficulty) {
		return (
			<HomeContainer>
				<SelectMap />
			</HomeContainer>
		);
	}
}
