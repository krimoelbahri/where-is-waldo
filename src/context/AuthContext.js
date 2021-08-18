import {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInAnonymously,
	signOut,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [currentName, setCurrentName] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function updateProfileName(name) {
		return updateProfile(auth.currentUser, { displayName: name });
	}
	function guestLogin() {
		return signInAnonymously(auth);
	}
	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				updateProfile(user, { displayName: currentName });
			}
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, [currentName]);

	const value = {
		currentUser,
		setCurrentName,
		login,
		updateProfileName,
		guestLogin,
		signup,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
