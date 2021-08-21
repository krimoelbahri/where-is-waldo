import React, { useContext } from "react";
import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	where,
	orderBy,
	limit,
	collection,
	query,
} from "firebase/firestore";
import { db } from "../firebase";

const DataContext = React.createContext();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	async function getData(collectionName, document) {
		const data = await getDoc(doc(db, collectionName, document));
		return data;
	}
	async function getScoreData(collectionName, difficulty) {
		const q = query(
			collection(db, collectionName),
			where("difficulty", "==", difficulty),
			orderBy("time", "asc"),
			limit(15)
		);
		let scoreArray = [];
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			scoreArray.push(doc.data());
		});
		return scoreArray;
	}
	async function setData(collectionName, data) {
		await setDoc(doc(collection(db, collectionName)), data);
	}

	const value = { getData, setData, getScoreData };

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	);
}
