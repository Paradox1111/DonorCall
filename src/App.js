import React, { useState, useEffect } from "react";
import axios from "axios";
import ls from "local-storage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Donors from "./components/Donors";
import Stewards from "./components/Stewards";
import NewSteward from "./components/NewSteward";
import NewDonor from "./components/NewDonor";
import Login from "./components/Login";
import DonorModal from "./components/DonorModal";
import EditDonor from "./components/EditDonor";
import ConfirmDelete from "./components/ConfirmDelete";
import "./App.css";
import { Nav, Row, Container, NavDropdown, Navbar } from "react-bootstrap";

function App() {
	const [user, setUser] = useState(null);
	const [donors, setDonors] = useState(null);
	const [stewards, setStewards] = useState(null);
	const [showLogin, setShowLogin] = useState(false);
	const [showDonor, setShowDonor] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showNewDonor, setShowNewDonor] = useState(false);
	const [showNewSteward, setShowNewSteward] = useState(false);
	const [currentDonor, setCurrentDonor] = useState(null);
	const handlehide = modal => {
		switch (modal) {
			case "showDonor":
				setShowDonor(false);
				break;
			case "delete":
				setShowDelete(false);
				break;
			case "edit":
				setShowEdit(false);
				break;
			case "login":
				setShowLogin(false);
				break;
			case "newDonor":
				setShowNewDonor(false);
				break;
			case "newSteward":
				setShowNewSteward(false);
				break;
			default:
				break;
		}
	};
	const handleShow = modal => {
		switch (modal) {
			case "showDonor":
				setShowDonor(true);
				break;
			case "delete":
				setShowDelete(true);
				break;
			case "edit":
				setShowEdit(true);
				break;
			case "login":
				setShowLogin(true);
				break;
			case "newDonor":
				setShowNewDonor(true);
				break;
			case "newSteward":
				setShowNewSteward(true);
				break;
			default:
				break;
		}
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
	const login = e => {
		let tempUser;
		if (e) {
			e.preventDefault();
			tempUser = {
				username: e.target.username.value,
				password: e.target.password.value
			};
		}
		const url = "https://donor-call-api.herokuapp.com/api/token/";
		axios.post(url, tempUser).then(response => {
			if (response.data.access) {
				setUser({
					username: tempUser.username,
					tokens: response.data
				});
				ls.set("user", {
					username: tempUser.username,
					tokens: response.data
				});
				getDonors(response.data.access);
				setTimeout(() => {
					handlehide("login");
				}, 750);
			}
		});
	};
	const logout = () => {
		setUser(null);
		setDonors(null);
		ls.set("user", null);
		setShowLogin(true);
	};
	const getDonors = access => {
		const config = {
			headers: { Authorization: `Bearer ${access}` }
		};
		const url = "https://donor-call-api.herokuapp.com/donors";
		axios
			.get(url, config)
			.then(response => {
				if (response.statusText !== "OK") {
					refresh();
					setTimeout(() => {
						getDonors(access);
					}, 500);
				} else {
					setDonors(response.data);
				}
			})
			.catch(console.error);
	};
	const deleteDonor = (e, id) => {
		const access = ls.get("user").tokens.access;
		const config = { headers: { Authorization: `Bearer ${access}` } };
		const url = "https://donor-call-api.herokuapp.com/donors/" + id;
		axios
			.delete(url, config)
			.then(response => {
				if (response.statusText !== "No Content") {
					//if the delete fails refresh access token and retry
					refresh();
					setTimeout(() => {
						deleteDonor(e, id);
					}, 250);
				} else {
					getDonors(access);
				}
			})
			.catch(console.error);
	};
	const editDonor = (e, id) => {
		e.preventDefault();
		const donor = {
			user_id: e.target.user_id.value,
			id: id,
			orgName: e.target.orgName.value,
			lastname: e.target.lastname.value,
			phone: e.target.phone.value,
			email: e.target.email.value,
			yeartotal: e.target.yeartotal.value,
			lastgift: e.target.lastgift.value,
			lastgiftdate: e.target.lastgiftdate.value,
			nextlastgift: e.target.nextlastgift.value,
			nextlastgiftdate: e.target.nextlastgiftdate.value,
			botsteward: e.target.botsteward.value,
			paymentnum: e.target.paymentnum.value,
			comments: e.target.comments.value
		};

		const access = ls.get("user").tokens.access;

		const config = {
			headers: {
				Authorization: `Bearer ${access}`
			}
		};
		const url = "https://donor-call-api.herokuapp.com/donors/" + id;

		axios
			.put(url, donor, config)
			.then(response => {
				if (response.statusText !== "OK") {
					throw Error(response.statusText);
				}
				return response;
			})
			.catch(console.error);
	};
	const getStewards = access => {
		const config = {
			headers: { Authorization: `Bearer ${access}` }
		};
		const url = "https://donor-call-api.herokuapp.com/stewards";
		axios
			.get(url, config)
			.then(response => {
				if (response.statusText !== "OK") {
					refresh();
					setTimeout(() => {
						getStewards(access);
					}, 500);
				} else {
					setStewards(response.data);
				}
			})
			.catch(console.error);
	};
	useEffect(() => {
		//if there's a user in localstorage, set state
		if (ls.get("user")) {
			setUser(ls.get("user"));
			if (!stewards) {
				const access = ls.get("user").tokens.access;
				getStewards(access);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<Row>
				<Navbar fixed='top' className='nav'>
					<Navbar.Brand className='title' href='/'>
						Donor Call
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
					<Nav variant='pills'>
						<Nav.Link className='link' href='/'>
							Donors
						</Nav.Link>

						<Nav.Link className='link' href='/stewards'>
							Stewards
						</Nav.Link>

						<NavDropdown className='dropdown' title='New'>
							<NavDropdown.Item
								onClick={() => {
									handleShow("newSteward");
								}}
							>
								Add a steward
							</NavDropdown.Item>

							<NavDropdown.Item
								onClick={() => {
									handleShow("newDonor");
								}}
							>
								Add a donor
							</NavDropdown.Item>
						</NavDropdown>

						{!user ? (
							<Nav.Link
								className='link'
								onClick={() => {
									handleShow("login");
								}}
							>
								Login
							</Nav.Link>
						) : (
							<Nav.Link className='link' onClick={logout}>
								Logout
							</Nav.Link>
						)}
					</Nav>
				</Navbar>
			</Row>
			{showLogin && (
				<Login
					hideLogin={() => {
						handlehide("login");
					}}
					handleLogin={login}
				/>
			)}
			{showNewDonor && user && (
				<NewDonor
					showNewDonor={showNewDonor}
					handlehide={handlehide}
					stewards={stewards}
					getStewards={getStewards}
					getDonors={getDonors}
				/>
			)}
			{showNewSteward && user && (
				<NewSteward showNewSteward={showNewSteward} handlehide={handlehide} />
			)}
			<Row>
				<main>
					{currentDonor && user && (
						<div>
							<DonorModal
								showDonor={showDonor}
								handleShow={handleShow}
								handlehide={handlehide}
								donor={currentDonor}
							/>

							<ConfirmDelete
								showDelete={showDelete}
								handlehide={handlehide}
								donor={currentDonor}
								deleteDonor={deleteDonor}
							/>

							<EditDonor
								showEdit={showEdit}
								handlehide={handlehide}
								editDonor={editDonor}
								getDonors={getDonors}
								donor={currentDonor}
								stewards={stewards}
								getStewards={getStewards}
							/>
						</div>
					)}
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Donors
									donors={donors}
									currentDonor={currentDonor}
									setCurrentDonor={setCurrentDonor}
									getDonors={getDonors}
									refresh={refresh}
									handlehide={handlehide}
									handleShow={handleShow}
									showDelete={showDelete}
									showEdit={showEdit}
									showDonor={showDonor}
									getStewards={getStewards}
									stewards={stewards}
								/>
							)}
						/>
						<Route exact path='/stewards/new' render={NewSteward} />
						<Route
							path='/stewards'
							render={() => (
								<Stewards
									stewards={stewards}
									showLogin={showLogin}
									handlehide={handlehide}
									handleShow={handleShow}
									setStewards={setStewards}
									getStewards={getStewards}
									refresh={refresh}
								/>
							)}
						/>
						<Route path='/donors/new' render={NewDonor} />
					</Switch>
				</main>
			</Row>
		</Container>
	);
}

export default App;
