import "../style/App.css";
import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { HomePrivateRoute, LoginPrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import { DataProvider } from "../context/DataContext";
import Home from "./Home";
import Header from "./Header";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import styled from "styled-components";

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	background-color: black;
	color: white;
`;
function App() {
	return (
		<HashRouter className='App'>
			<AuthProvider>
				<HeaderContainer className='App-header'>
					<Header />
				</HeaderContainer>
				<DataProvider>
					<Switch>
						<HomePrivateRoute exact path='/' component={Home} />
						<LoginPrivateRoute exact path='/login' component={LogIn} />
						<LoginPrivateRoute exact path='/signup' component={SignUp} />
					</Switch>
				</DataProvider>
			</AuthProvider>
		</HashRouter>
	);
}

export default App;
