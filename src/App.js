import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch } from "react-router-dom";
import Donors from "./components/Donors";
import Stewards from "./components/Stewards";
import NewSteward from "./components/NewSteward";
import NewDonor from "./components/NewDonor";
import "./App.css";

import {
	Nav,
	Button,
	Row,
	Col,
	Container,
	NavDropdown,
	Navbar
} from "react-bootstrap";

function App() {
	return (
		<Container>
			<Row>
				<Navbar>
					<Navbar.Brand href='/'>Donor Call</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
					<Nav>
						<Nav.Link href='/'>Donors</Nav.Link>

						<Nav.Link href='/stewards'>Stewards</Nav.Link>

						<NavDropdown title='New'>
							<NavDropdown.Item href='/stewards/new'>
								Add a steward
							</NavDropdown.Item>

							<NavDropdown.Item href='/donors/new'>
								Add a donor
							</NavDropdown.Item>
						</NavDropdown>

						<Nav.Link>Login/Logout</Nav.Link>
					</Nav>
				</Navbar>
			</Row>
			<Row>
				<main>
					<Switch>
						<Route exact path='/' component={Donors} />
						<Route path='/stewards/new' render={NewSteward} />
						<Route path='/stewards' component={Stewards} />
						<Route path='/donors/new' render={NewDonor} />
					</Switch>
				</main>
			</Row>
		</Container>
	);
}

export default App;
