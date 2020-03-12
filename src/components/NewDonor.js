import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Form, Dropdown } from "react-bootstrap";
import ls from "local-storage";
import axios from "axios";

function NewDonor(props) {
	const [steward, setSteward] = useState(null);
	let stewards = null;
	useEffect(() => {
		const access = ls.get("user").tokens.access;
		props.getStewards(access);
	}, []);
	const newDonor = e => {
		e.preventDefault();
		const donor = {
			user_id: e.target.user_id.value,
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
		const url = "https://donor-call-api.herokuapp.com/donors";
		axios
			.post(url, donor, config)
			.then(response => {
				if (!response.statusText === "OK") {
					throw Error(response.statusText);
				}
				return response;
			})
			.catch(console.error);
	};
	const onChange = () => {
		// this is just here to prevent the error:
		//You provided a `value` prop to a form field without an `onChange` handler.
	};
	if (props.stewards) {
		stewards = props.stewards.map(stew => (
			<Dropdown.Item onClick={() => setSteward(stew)} key={stew.username}>
				{stew.username}
			</Dropdown.Item>
		));
		return (
			<Modal
				show={props.showNewDonor}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				onHide={() => {
					props.handlehide("newDonor");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>New</Modal.Title>
				</Modal.Header>
				<Form
					onSubmit={e => {
						newDonor(e);
						setTimeout(() => {
							props.handlehide("newDonor");
							const access = ls.get("user").tokens.access;
							props.getDonors(access);
						}, 250);
					}}
				>
					<Modal.Body>
						<Form.Group controlId='orgName'>
							<Form.Label>First name/Organization name *</Form.Label>
							<Form.Control required type='orgName' />
						</Form.Group>
						<Form.Group controlId='lastname'>
							<Form.Label>Last name</Form.Label>
							<Form.Control type='lastname' />
						</Form.Group>
						<Form.Group controlId='phone'>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control type='phone' />
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type='email' />
						</Form.Group>
						<Form.Group controlId='yeartotal'>
							<Form.Label>Year Total *</Form.Label>
							<Form.Control required type='yeartotal' />
						</Form.Group>
						<Form.Group controlId='lastgift'>
							<Form.Label>Last gift amount *</Form.Label>
							<Form.Control required type='lastgift' />
						</Form.Group>
						<Form.Group controlId='lastgiftdate'>
							<Form.Label>Last gift date MM/DD/YY *</Form.Label>
							<Form.Control required type='lastgiftdate' />
						</Form.Group>
						<Form.Group controlId='nextlastgift'>
							<Form.Label>Next to last gift amount</Form.Label>
							<Form.Control type='nextlastgift' />
						</Form.Group>
						<Form.Group controlId='nextlastgiftdate'>
							<Form.Label>Next to last gift date MM/DD/YY</Form.Label>
							<Form.Control type='nextlastgiftdate' />
						</Form.Group>
						<Form.Group controlId='paymentnum'>
							<Form.Label>Total donations made</Form.Label>
							<Form.Control type='paymentnum' />
						</Form.Group>
						<Form.Group controlId='botsteward'>
							<Form.Label>BOT Steward *</Form.Label>

							{steward ? (
								<Form.Control
									onChange={onChange}
									required
									type='text'
									value={steward.username}
								/>
							) : (
								<Form.Control
									onChange={onChange}
									required
									type='text'
									value={props.stewards[0].username}
								/>
							)}
						</Form.Group>
						{steward ? (
							<Form.Group className='hidden' controlId='user_id'>
								<Form.Label>Steward ID *</Form.Label>
								<Form.Control
									required
									onChange={onChange}
									type='text'
									defaultValue={steward.id}
								/>
							</Form.Group>
						) : (
							<Form.Group className='hidden' controlId='user_id'>
								<Form.Label>Steward ID *</Form.Label>
								<Form.Control
									required
									onChange={onChange}
									type='text'
									defaultValue={props.stewards[0].username}
								/>
							</Form.Group>
						)}
						<Form.Group>
							<Dropdown>
								<Dropdown.Toggle
									variant='outline-primary'
									block
									id='dropdown-basic'
								>
									Select steward
								</Dropdown.Toggle>
								<Dropdown.Menu>{stewards}</Dropdown.Menu>
							</Dropdown>
						</Form.Group>
						<Form.Group controlId='comments'>
							<Form.Label>Comments</Form.Label>
							<Form.Control type='comments' />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button type='submit'>Submit</Button>
						<Button
							onClick={() => {
								props.handlehide("edit");
							}}
						>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	} else {
		return null;
	}
}

export default NewDonor;
