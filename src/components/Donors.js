import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Row, ListGroup } from "react-bootstrap";
import ls from "local-storage";
import DonorModal from "./DonorModal";

function Donors(props) {
	// const [query, setQuery] = useState(null);
	const [show, setShow] = useState(false);
	const [currentDonor, setCurrentDonor] = useState(null);
	const handleHide = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
	};
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
			<Col key={donor.id}>
				<Card className='donorCard' style={{ width: "22rem" }}>
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
							{donor.phone != "" ? (
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
								setCurrentDonor(donor);
								setShow(true);
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
				<Row>Search Bar</Row>

				<DonorModal show={show} handleHide={handleHide} donor={currentDonor} />

				<Row>{filteredDonors}</Row>
			</div>
		);
	} else if (!ls.get("user")) {
		return null;
	} else {
		return <h3>Loading...</h3>;
	}
}

export default Donors;
