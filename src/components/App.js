import "../style/App.css";
import { HashRouter, Switch } from "react-router-dom";
import { HomePrivateRoute, LoginPrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import styled from "styled-components";

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background-color: black;
	color: white;
`;
function App() {
	return (
		<HashRouter className='App'>
			<AuthProvider>
				<Header className='App-header'>
					<h1>Wher's Waldo</h1>
				</Header>
				<Switch>
					<HomePrivateRoute exact path='/' component={Home} />
					<LoginPrivateRoute exact path='/login' component={LogIn} />
					<LoginPrivateRoute exact path='/signup' component={SignUp} />
				</Switch>
			</AuthProvider>
		</HashRouter>
	);
}

export default App;
