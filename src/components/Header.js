import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../context/AuthContext";
import { useMapData } from "../context/MapDataContext";

export default function Header() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const { setMap, setDifficulty, setLoading } = useMapData();

	async function handleLogout() {
		try {
			await logout();
		} catch (error) {
			setError("could not log out");
		}
	}
	function handlClick() {
		setMap("");
		setDifficulty("");
		setLoading(true);
	}
	return (
		<>
			<Link to='/'>
				<h1 style={{ color: "white" }} onClick={handlClick}>
					Wher's Waldo
				</h1>
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
