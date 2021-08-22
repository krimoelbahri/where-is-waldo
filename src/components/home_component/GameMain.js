import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useMapData } from "../../context/MapDataContext";
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
function dataObject(name, difficulty, map, time) {
	let obj = {
		name,
		difficulty,
		map,
		time,
	};
	return obj;
}

export default function GameMain() {
	const {
		map,
		setMap,
		mapImgSrc,
		mapData,
		setMapData,
		difficulty,
		setDifficulty,
		setLoading,
	} = useMapData();
	const history = useHistory();
	const { setData } = useData();
	const { currentUser } = useAuth();

	const [timeInSeconds, setTimeInSeconds] = useState(0);
	const [charactersData, setCharactersData] = useState([]);
	const [posX, setPosX] = useState("");
	const [posY, setPosY] = useState("");
	const [displayCharMenu, setDisplayCharMenu] = useState(false);
	const [charArray, setCharArray] = useState([]);
	const [gameOver, setGameOver] = useState(false);

	function handleClick(e) {
		let border = e.target.getBoundingClientRect();
		setPosX(e.clientX - border.left);
		setPosY(e.clientY - border.top);
		setDisplayCharMenu((display) => !display);
	}

	function handleGoBack() {
		setMap("");
		setDifficulty("");
		setLoading(true);
		setMapData([]);
	}

	function checkIfCharFound(e) {
		setDisplayCharMenu((display) => !display);
		let i = e.target.id;
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

	async function checkGameOver() {
		if (charArray.length === 1) {
			setGameOver(true);
			await setData(
				`${map}scoreboard`,
				dataObject(
					currentUser.displayName ? currentUser.displayName : "User",
					difficulty,
					map,
					timeInSeconds
				)
			);
			setLoading(true);
			history.push("/scoreboard");
		}
	}

	useEffect(() => {
		if (mapData) {
			setGameOver(false);
			setCharactersData(Object.keys(mapData));
			setCharArray((arr) => {
				return Object.keys(mapData).map((char) => {
					return [...arr, mapData[char]];
				});
			});
		}
	}, [mapData]);

	return (
		<>
			{!gameOver && (
				<>
					<FlexR>
						{charactersData.map((char, i) => {
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
						<Image onClick={handleClick} src={mapImgSrc} alt='Game' />
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
