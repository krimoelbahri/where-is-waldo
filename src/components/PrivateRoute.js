import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function HomePrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}></Route>
	);
}

export function LoginPrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return !currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/' />
				);
			}}></Route>
	);
}
