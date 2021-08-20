import React from "react";
import styled from "styled-components";
import Map1 from "../assets/gameImage.jpg";
import Map2 from "../assets/gameImage2.png";
import Map3 from "../assets/gameImage3.jpg";

const Container = styled.div`
	width: 90%;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const FlexR = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 25%;
`;
const MapsContainer = styled(FlexR)`
	width: 90%;
	height: 60%;
`;
const MapContainer = styled.div`
	width: 30%;
	height: 90%;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;

export default function SelectMap(props) {
	const { setMap, setMapSrc, setDifficulty } = props;

	function handleImageClick(e) {
		setMapSrc(e.target.currentSrc);
		setMap(e.target.alt);
	}
	function handleDifficultyClick(e) {
		setDifficulty(e.target.value);
	}

	return (
		<Container>
			<div>
				<h1>Choose a Map</h1>
			</div>
			<MapsContainer>
				<MapContainer>
					<Image onClick={handleImageClick} src={Map1} alt='Map1' />
				</MapContainer>
				<MapContainer>
					<Image onClick={handleImageClick} src={Map2} alt='Map2' />
				</MapContainer>
				<MapContainer>
					<Image onClick={handleImageClick} src={Map3} alt='Map3' />
				</MapContainer>
			</MapsContainer>
			<div>
				<h1>Difficulty</h1>
			</div>
			<FlexR>
				<button onClick={handleDifficultyClick} value='easy'>
					Easy
				</button>
				<button onClick={handleDifficultyClick} value='medium'>
					Medium
				</button>
				<button onClick={handleDifficultyClick} value='hard'>
					Hard
				</button>
			</FlexR>
		</Container>
	);
}
