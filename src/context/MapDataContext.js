import React, { useContext, useState } from "react";

const MapDataContext = React.createContext();
export function useMapData() {
	return useContext(MapDataContext);
}
export function MapDataProvider({ children }) {
	const [map, setMap] = useState();
	const [mapImgSrc, setMapImgSrc] = useState();
	const [mapData, setMapData] = useState();
	const [difficulty, setDifficulty] = useState();
	const [loading, setLoading] = useState(true);

	const value = {
		map,
		setMap,
		mapImgSrc,
		setMapImgSrc,
		mapData,
		setMapData,
		difficulty,
		setDifficulty,
		loading,
		setLoading,
	};

	return (
		<MapDataContext.Provider value={value}>
			{children}
		</MapDataContext.Provider>
	);
}
