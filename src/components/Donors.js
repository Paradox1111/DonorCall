import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, ListGroup } from "react-bootstrap";
import ls from "local-storage";
import axios from "axios";

function Donors(props) {
	const [query, setQuery] = useState(null);
	const [stewId, setStewId] = useState(null);
	const [filter, setFilter] = useState(false);
	const toggleFilter = () => {
		if (filter) {
			setFilter(false);
		} else {
			setFilter(true);
		}
	};
	const deleteDonor = (e, id) => {
		e.preventDefault();
		const access = ls.get("user").tokens.access;
		const config = { headers: { Authorization: `Bearer ${access}` } };
		const url = "https://donor-call-api.herokuapp.com/donors/" + id;
		axios
			.delete(url, config)
			.then(response => {
				if (response.statusText !== "OK") {
					props.refresh();
					setTimeout(() => {
						deleteDonor(e, id);
					}, 500);
				}
			})
			.catch(console.error);
	};
	const editDonor = (e, id) => {
		e.preventDefault();
		const donor = {
			orgName: e.target.orgName.value,
			lastname: e.target.lastname.value,
			phone: e.target.phone.value,
			email: e.target.email.value,
			yeartotal: e.target.yeartotal.value,
			lastgift: e.target.lastgift.value,
			lastgiftdate: e.target.lastgiftdate.value,
			nextlastgift: e.target.nextlastgift.value,
			nextlastgiftdate: e.target.nextlastgiftdate.value,
			paymentnum: e.target.paymentnum.value,
			comments: e.target.comments.value
		};
		const access = ls.get("user").tokens.access;
		const config = { headers: { Authorization: `Bearer ${access}` } };
		const url = "https://donor-call-api.herokuapp.com/donors/" + id;
		axios
			.post(url, donor, config)
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.catch(console.error);
	};
	const alphabetize = (a, b) => {
		if (a.orgName < b.orgName) {
			return -1;
		}
		if (a.orgName > b.orgName) {
			return 1;
		}
		return 0;
	};
	useEffect(() => {
		if (!ls.get("user")) {
			//if a user is not currently logged in
			//prompt the user to login
			props.handleShow("login");
		} else if (!props.donors) {
			//if a user is currently logged in and props does not contain donors
			//fetch donors with the current user's access token
			let access = ls.get("user").tokens.access;
			props.getDonors(access);
		} else if (!props.stewards) {
			//if user logged in and stewards not in props
			//get stewards
			const access = ls.get("user").tokens.access;
			props.getStewards(access);
		} else if (props.stewards && stewId !== ls.get("user").id) {
			//if props contains stewards and stewId is not already set
			//set stewID = current user id
			let currentSteward = props.stewards.filter(
				stew => stew.username === ls.get("user").username
			);
			setStewId(currentSteward[0].id);
		}
	});
	if (ls.get("user") && props.donors) {
		//If a user is logged in and props does contain donors
		// map over donors and return

		let filteredDonors = null;
		if (filter) {
			//if filter is true return donors pertaining to the current user, alphabetized
			filteredDonors = props.donors.filter(donor => {
				return donor.user_id === stewId;
			});
			filteredDonors.sort(alphabetize);
		} else {
			//otherwise return all donors, alphabetized
			filteredDonors = props.donors;
			filteredDonors.sort(alphabetize);
		}

		let donorElems = filteredDonors.map(donor => (
			<Col className='donorCol' key={donor.id}>
				<Card className='donorCard text-center' style={{ width: "22rem" }}>
					<Card.Body>
						{donor.lastname ? (
							<Card.Header>
								{donor.orgName} {donor.lastname}
							</Card.Header>
						) : (
							<Card.Header>{donor.orgName}</Card.Header>
						)}

						<ListGroup>
							<ListGroup.Item variant='info'>
								Year total: {donor.yeartotal}
							</ListGroup.Item>
							<ListGroup.Item variant='secondary'>
								Last gift: {donor.lastgift}, {donor.lastgiftdate}
							</ListGroup.Item>
							{donor.phone !== "" ? (
								<ListGroup.Item variant='info'>
									Phone: {donor.phone}
								</ListGroup.Item>
							) : (
								<ListGroup.Item variant='info' disabled>
									No phone number available
								</ListGroup.Item>
							)}
						</ListGroup>

						<Button
							onClick={() => {
								props.setCurrentDonor(donor);
								props.handleShow("showDonor");
							}}
							variant='outline-primary'
							block
						>
							View details
						</Button>
					</Card.Body>
				</Card>
			</Col>
		));
		return (
			<div>
				{!filter ? (
					<Button onClick={toggleFilter} variant='info' block>
						View donors for currently logged in steward
					</Button>
				) : (
					<Button onClick={toggleFilter} variant='info' block>
						View all donors
					</Button>
				)}

				<Row>{donorElems}</Row>
			</div>
		);
	} else if (!ls.get("user")) {
		return null;
	} else {
		return <h3>Loading...</h3>;
	}
}

export default Donors;
