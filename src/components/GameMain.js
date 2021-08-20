import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import CharMenu from "./CharMenu";
import Timer from "./Timer";

const FlexR = styled.div`
	width: 100%;
	height: 80px;
	border: 1px solid;
	display: flex;
	flex-direction: Row;
	align-items: center;
	justify-content: space-around;
	margin: 5px;
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
	width: 50px;
	height: 50px;
	border: 2px solid;
	margin-right: 5px;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
export default function GameMain(props) {
	const {
		setMap,
		setDifficulty,
		setLoading,
		setMapData,
		mapData,
		imgSrc,
	} = props;
	const [timeInSeconds, setTimeInSeconds] = useState(0);
	const [Data, setData] = useState([]);
	const [posX, setPosX] = useState("");
	const [posY, setPosY] = useState("");
	const [displayCharMenu, setDisplayCharMenu] = useState(false);
	const [charArray, setCharArray] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const history = useHistory();

	function handleClick(e) {
		let border = e.target.getBoundingClientRect();
		setPosX(e.clientX - border.left);
		setPosY(e.clientY - border.top);
		setDisplayCharMenu((display) => !display);
	}

	function handleGoBack() {
		setMap(false);
		setDifficulty(false);
		setLoading(true);
		setMapData();
	}
	function checkIfCharFound(e) {
		setDisplayCharMenu((display) => !display);
		let i = e.target.id;
		console.log(charArray[i]);
		if (
			posX <= charArray[i][0]["maxX"] &&
			posX >= charArray[i][0]["minX"] &&
			posY <= charArray[i][0]["maxY"] &&
			posY >= charArray[i][0]["minY"]
		) {
			setCharArray((arr) => {
				return (arr = arr.filter((Char) => Char !== charArray[i]));
			});
		}
		checkGameOver();
	}
	function checkGameOver() {
		if (charArray.length === 1) {
			setGameOver(true);

			history.push("/scoreboard");
		}
	}
	useEffect(() => {
		setGameOver(false);
		setData(Object.keys(mapData));
		setCharArray((arr) => {
			return Object.keys(mapData).map((char) => {
				return [...arr, mapData[char]];
			});
		});
	}, [mapData]);

	return (
		<>
			{!gameOver && (
				<>
					<FlexR>
						{Data.map((char, i) => {
							return (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
									key={i}>
									<CharContainer>
										<Image src={mapData[char]["imgUrl"]} alt='Char' />
									</CharContainer>
									<h4>{mapData[char]["name"]}</h4>
								</div>
							);
						})}
						<FlexC>
							<Timer setTimeInSeconds={setTimeInSeconds} />
						</FlexC>
						<FlexC>
							<button onClick={handleGoBack}>Go Back</button>
						</FlexC>
					</FlexR>

					<ImageContainer>
						<Image onClick={handleClick} src={imgSrc} alt='Game' />
					</ImageContainer>

					{displayCharMenu && (
						<CharMenu
							display={displayCharMenu}
							posX={posX}
							posY={posY}
							charArray={charArray}
							checkIfCharFound={checkIfCharFound}
						/>
					)}
				</>
			)}
		</>
	);
}
