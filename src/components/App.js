import "../style/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";
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
		<BrowserRouter className='App'>
			<AuthProvider>
				<Header className='App-header'>
					<h1>Wher's Waldo</h1>
				</Header>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/signup' component={SignUp} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
