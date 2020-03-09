import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ls from "local-storage";

function Donors(props) {
	useEffect(() => {
		if (!ls.get("user")) {
			//if a user is not currently logged in
			//prompt the user to login
			props.showLogin();
		} else if (!props.donors) {
			//if a user is currently logged in and props does not contain donors
			//fetch donors with the current user's access token
			let access = ls.get("user").tokens.access;
			props.getDonors(access);
		}
	});
	if (ls.get("user") && props.donors) {
		//If a user is logged in and props does contain donors
		// map over donors and return
		let filteredDonors = props.donors.map(donor => (
			<Card key={donor.id} style={{ width: "18rem" }}>
				<Card.Body>
					{donor.lastname ? (
						<Card.Title>
							{donor.orgName} {donor.lastname}
						</Card.Title>
					) : (
						<Card.Title>{donor.orgName}</Card.Title>
					)}
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Button variant='primary'>Go somewhere</Button>
				</Card.Body>
			</Card>
		));
		return <div>{filteredDonors}</div>;
	} else if (!ls.get("user")) {
		return null;
	} else {
		return <h3>Loading...</h3>;
	}
}

export default Donors;
