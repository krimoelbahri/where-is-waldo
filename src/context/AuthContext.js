import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInAnonymously,
	signOut,
	updateEmail,
	updatePassword,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function guestLogin() {
		return signInAnonymously(auth);
	}
	function logout() {
		return signOut(auth);
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email);
	}

	function setUpdatedEmail(email) {
		return updateEmail(currentUser, email);
	}

	function setUpdatedPassword(password) {
		return updatePassword(currentUser, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log(user ? true : false);
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		guestLogin,
		signup,
		logout,
		resetPassword,
		setUpdatedEmail,
		setUpdatedPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
