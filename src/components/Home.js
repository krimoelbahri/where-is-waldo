import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SignIn from "./Home-components/SignIn";

export default function Home() {
	return (
		<div id='Home' className='container'>
			<h1>Where's Waldo </h1>
			<div>
				<div>
					<h2>Sign in to play</h2>
					<SignIn />
					<h2>
						{" "}
						You don't have an account? <Link to='/signup'>
							Sign Up
						</Link>{" "}
					</h2>
					<button id='guestButton'>
						<p>Play as Guest</p>
					</button>
				</div>
			</div>
		</div>
	);
}
