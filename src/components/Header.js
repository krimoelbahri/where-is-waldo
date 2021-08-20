import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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
			<Link to='/'>
				<h1>Wher's Waldo</h1>
			</Link>
			<p>{error}</p>

			{currentUser && (
				<div>
					<h3>
						Welcome{" "}
						{currentUser.displayName ? currentUser.displayName : "Guest"}
					</h3>{" "}
					<button onClick={handleLogout}>Log out</button>
				</div>
			)}
		</>
	);
}
