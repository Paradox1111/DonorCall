import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ls from "local-storage";
import axios from "axios";
function NewSteward(props) {
	const newSteward = e => {
		e.preventDefault();
		const steward = {
			username: e.target.username.value,
			password: e.target.password.value
		};
		const access = ls.get("user").tokens.access;
		const config = { headers: { Authorization: `Bearer ${access}` } };
		const url = "https://donor-call-api.herokuapp.com/stewards";
		axios
			.post(url, steward, config)
			.then(response => {
				if (response.statusText !== "Created") {
					throw Error(response.statusText);
				}
				return response;
			})
			.catch(console.error);
	};
	return (
		<Modal
			onHide={() => {
				props.handlehide("newSteward");
			}}
			show={props.showNewSteward}
		>
			<Modal.Header closeButton>
				<Modal.Title>Create new steward account</Modal.Title>
			</Modal.Header>
			<Form onSubmit={e => [newSteward(e)]}>
				<Modal.Body>
					<Form.Group controlId='username'>
						<Form.Label>Enter user name</Form.Label>
						<Form.Control type='text' />
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Enter password</Form.Label>
						<Form.Control type='password' />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-success' type='submit'>
						Submit
					</Button>
					<Button
						variant='outline-info'
						onClick={() => {
							props.handlehide("newSteward");
						}}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default NewSteward;
