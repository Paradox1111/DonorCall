import React from "react";
import logo from "./logo.svg";
import { Link, Route, Switch } from "react-router-dom";
import Donors from "./components/Donors";
import Stewards from "./components/Stewards";
import NewSteward from "./components/NewSteward";
import NewDonor from "./components/NewDonor";
import "./App.css";

function App() {
	return (
		<nav>
			<nav>
				<Link to='/'>All donors</Link>
				<Link to='/stewards'>Stewards</Link>
				<Link to='/stewards/new'>New steward</Link>
				<Link to='/donors/new'>New donor</Link>
				<Link>Login/Logout</Link>
			</nav>
			<Switch>
				<Route exact path='/' component={Donors} />
				<Route path='/stewards/new' render={NewSteward} />
				<Route path='/stewards' component={Stewards} />
				<Route path='/donors/new' render={NewDonor} />
			</Switch>
		</nav>
	);
}

export default App;
