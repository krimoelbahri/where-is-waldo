import React, { useState } from "react";
import styled from "styled-components";

const FlexR = styled.div`
	width: 100%;
	height: 50px;
	border: 1px solid;
	display: flex;
	flex-direction: Row;
	align-items: center;
	justify-content: space-around;
	margin: 20px;
`;
const FlexC = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 5px;
`;
const ImageContainer = styled.div`
	width: 1200px;
`;
const CharContainer = styled.div`
	width: 30px;
	height: 30px;
	border: 2px solid;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
export default function GameMain(props) {
	const [posX, setPosX] = useState("");
	const [posY, setPosY] = useState("");
	function handleClick(e) {
		let border = e.target.getBoundingClientRect();
		setPosX(e.clientX - border.left);
		setPosY(e.clientY - border.top);
	}

	function handleGoBack() {
		props.setMap(false);
		props.setDifficulty(false);
		props.setLoading(true);
		props.setMapData(false);
	}

	return (
		<>
			<FlexR>
				<CharContainer>
					<Image src={props.mapData.char1.imgUrl} alt='Char' />
				</CharContainer>

				<FlexC>
					<p>PosX:{posX}</p>
					<p>PosY:{posY}</p>
				</FlexC>
				<FlexC>
					<button onClick={handleGoBack}>Go Back</button>
				</FlexC>
			</FlexR>
			<ImageContainer>
				<Image onClick={handleClick} src={props.imgSrc} alt='Game' />
			</ImageContainer>
		</>
	);
}
