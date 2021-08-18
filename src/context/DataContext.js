import React, { useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DataContext = React.createContext();
export function useData() {
	return useContext(DataContext);
}
export function DataProvider({ children }) {
	const [loading, setLoading] = useState(true);
	async function getData(collection, document) {
		const data = await getDoc(doc(db, collection, document));
		return data;
	}
	useEffect(() => {
		setLoading(false);
	}, []);

	const value = { getData };

	return (
		<DataContext.Provider value={value}>
			{!loading && children}
		</DataContext.Provider>
	);
}
