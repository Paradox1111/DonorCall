import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Form, Dropdown } from "react-bootstrap";
import ls from "local-storage";

function EditDonor(props) {
	const [steward, setSteward] = useState(null);
	useEffect(() => {
		const access = ls.get("user").tokens.access;
		props.getStewards(access);
	}, []);
	let stewards = null;
	if (props.stewards) {
		stewards = props.stewards.map(stew => (
			<Dropdown.Item onClick={() => setSteward(stew)} key={stew.username}>
				{stew.username}
			</Dropdown.Item>
		));

		return (
			<Modal
				show={props.showEdit}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				onHide={() => {
					props.handlehide("edit");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						Edit {props.donor.orgName}{" "}
						{props.donor.lastname && props.donor.lastname}
					</Modal.Title>
				</Modal.Header>
				<Form
					onSubmit={e => {
						props.editDonor(e, props.donor.id);
						setTimeout(() => {
							props.handlehide("edit");
							const access = ls.get("user").tokens.access;
							props.getDonors(access);
						}, 250);
					}}
				>
					<Modal.Body>
						<Form.Group controlId='orgName'>
							<Form.Label>First name/Organization name</Form.Label>
							<Form.Control
								required
								type='text'
								defaultValue={props.donor.orgName}
							/>
						</Form.Group>
						<Form.Group controlId='lastname'>
							<Form.Label>Last name</Form.Label>
							<Form.Control type='text' defaultValue={props.donor.lastname} />
						</Form.Group>
						<Form.Group controlId='phone'>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control type='text' defaultValue={props.donor.phone} />
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type='text' defaultValue={props.donor.email} />
						</Form.Group>
						<Form.Group controlId='yeartotal'>
							<Form.Label>Year Total</Form.Label>
							<Form.Control
								required
								type='text'
								defaultValue={props.donor.yeartotal}
							/>
						</Form.Group>
						<Form.Group controlId='lastgift'>
							<Form.Label>Last gift amount</Form.Label>
							<Form.Control
								required
								type='text'
								defaultValue={props.donor.lastgift}
							/>
						</Form.Group>
						<Form.Group controlId='lastgiftdate'>
							<Form.Label>Last gift date MM/DD/YY</Form.Label>
							<Form.Control
								required
								type='text'
								defaultValue={props.donor.lastgiftdate}
							/>
						</Form.Group>
						<Form.Group controlId='nextlastgift'>
							<Form.Label>Next to last gift amount</Form.Label>
							<Form.Control
								type='text'
								defaultValue={props.donor.nextlastgift}
							/>
						</Form.Group>
						<Form.Group controlId='nextlastgiftdate'>
							<Form.Label>Next to last gift date MM/DD/YY</Form.Label>
							<Form.Control
								type='text'
								defaultValue={props.donor.nextlastgiftdate}
							/>
						</Form.Group>
						<Form.Group controlId='paymentnum'>
							<Form.Label>Total donations made</Form.Label>
							<Form.Control type='text' defaultValue={props.donor.paymentnum} />
						</Form.Group>
						<Form.Group controlId='botsteward'>
							<Form.Label>BOT Steward</Form.Label>
							{steward ? (
								<Form.Control type='text' readOnly value={steward.username} />
							) : (
								<Form.Control
									type='text'
									readOnly
									value={props.donor.botsteward}
								/>
							)}
						</Form.Group>
						{steward && (
							<Form.Group className='hidden' controlId='user_id'>
								<Form.Label>Steward ID</Form.Label>
								<Form.Control type='text' readOnly value={steward.id} />
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
							<Form.Control type='text' defaultValue={props.donor.comments} />
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

export default EditDonor;
