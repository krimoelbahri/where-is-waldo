import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function Header() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();

	async function handleLogout() {
		try {
			await logout();
		} catch (error) {
			setError("could not log out");
		}
	}

	return (
		<>
			<h1>Wher's Waldo</h1>
			<p>{error}</p>

			{currentUser && (
				<div>
					<h3>Welcome {currentUser.displayName}</h3>{" "}
					<button onClick={handleLogout}>Log out</button>
				</div>
			)}
		</>
	);
}
