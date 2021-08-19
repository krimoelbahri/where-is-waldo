import React, { useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const DataContext = React.createContext();
export function useData() {
	return useContext(DataContext);
}
export function DataProvider({ children }) {
	async function getData(collection, document) {
		const data = await getDoc(doc(db, collection, document));
		return data;
	}

	const value = { getData };

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	);
}
