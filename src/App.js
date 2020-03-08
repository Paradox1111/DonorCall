import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Donors from "./components/Donors";
import Stewards from "./components/Stewards";
import NewSteward from "./components/NewSteward";
import NewDonor from "./components/NewDonor";
import Login from "./components/Login";
import "./App.css";

import { Nav, Row, Container, NavDropdown, Navbar } from "react-bootstrap";

function App() {
	const [user, setUser] = useState(null);
	const [show, setShow] = useState(false);

	const hideLogin = () => {
		setShow(false);
	};

	const showLogin = () => {
		setShow(true);
	};
	const refresh = () => {
		const url = "https://donor-call-api.herokuapp.com/api/token/refresh/";
		axios
			.post(url, { refresh: user.tokens.refresh })
			.then(response =>
				setUser({
					username: user.username,
					tokens: {
						access: response.data,
						refresh: user.tokens.refresh
					}
				})
			)
			.catch(console.error);
	};
	useEffect(() => {
		console.log(user);
	});
	const login = e => {
		e.preventDefault();
		const tempUser = {
			username: e.target.username.value,
			password: e.target.password.value
		};
		const url = "https://donor-call-api.herokuapp.com/api/token/";
		axios.post(url, tempUser).then(response => {
			setUser({
				username: tempUser.username,
				tokens: response.data
			});
		});
	};
	const handleLogout = () => {
		setUser(null);
	};

	return (
		<Container>
			<Row>
				<Navbar className='nav'>
					<Navbar.Brand className='title' href='/'>
						Donor Call
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
					<Nav>
						<Nav.Link className='link' className='link' href='/'>
							Donors
						</Nav.Link>

						<Nav.Link className='link' href='/stewards'>
							Stewards
						</Nav.Link>

						<NavDropdown className='dropdown' title='New'>
							<NavDropdown.Item href='/stewards/new'>
								Add a steward
							</NavDropdown.Item>

							<NavDropdown.Item href='/donors/new'>
								Add a donor
							</NavDropdown.Item>
						</NavDropdown>

						{!user ? (
							<Nav.Link className='link' onClick={showLogin}>
								Login
							</Nav.Link>
						) : (
							<Nav.Link className='link' onClick={handleLogout}>
								Logout
							</Nav.Link>
						)}
					</Nav>
				</Navbar>
			</Row>
			{show && <Login hideLogin={hideLogin} handleLogin={login} />}
			<Row>
				<main>
					<Switch>
						<Route exact path='/' component={Donors} />
						<Route exact path='/stewards/new' render={NewSteward} />
						<Route path='/stewards' component={Stewards} />
						<Route path='/donors/new' render={NewDonor} />
					</Switch>
				</main>
			</Row>
		</Container>
	);
}

export default App;
