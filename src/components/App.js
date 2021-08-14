import "../style/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./Home-components/SignUp";
import { AuthProvider } from "../context/AuthContext";

function App() {
	return (
		<BrowserRouter className='App'>
			<header className='App-header'></header>
			<AuthProvider>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/signup' component={SignUp} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
