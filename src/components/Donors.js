import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, ListGroup } from "react-bootstrap";
import ls from "local-storage";
import DonorModal from "./DonorModal";
import EditDonor from "./EditDonor";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";

function Donors(props) {
	const [query, setQuery] = useState(null);
	const [show, setShow] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [currentDonor, setCurrentDonor] = useState(null);
	const handlehide = modal => {
		switch (modal) {
			case "show":
				setShow(false);
				break;
			case "delete":
				setShowDelete(false);
				break;
			case "edit":
				setShowEdit(false);
				break;
		}
	};
	const handleShow = modal => {
		switch (modal) {
			case "show":
				setShow(true);
				break;
			case "delete":
				setShowDelete(true);
				break;
			case "edit":
				setShowEdit(true);
				break;
		}
	};
	const deleteDonor = (e, id) => {
		e.preventDefault();
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
		const url = "https://donor-call-api.herokuapp.com/donors/" + id;
		axios.post(url, donor);
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
								setCurrentDonor(donor);
								handleShow("show");
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

				{currentDonor && (
					<div>
						<DonorModal
							show={show}
							handleShow={handleShow}
							handlehide={handlehide}
							donor={currentDonor}
						/>

						<ConfirmDelete
							showDelete={showDelete}
							handlehide={handlehide}
							donor={currentDonor}
						/>

						<EditDonor
							showEdit={showEdit}
							handlehide={handlehide}
							editDonor={editDonor}
							donor={currentDonor}
						/>
					</div>
				)}

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
