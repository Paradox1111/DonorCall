import React from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";

function EditDonor(props) {
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
				<Modal.Title id='contained-modal-title-vcenter'>Edit</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={e => {
					props.editDonor(e, props.donor.id);
				}}
			>
				<Modal.Body>
					<Form.Group controlId='orgName'>
						<Form.Label>First name/Organization name</Form.Label>
						<Form.Control type='orgName' defaultValue={props.donor.orgName} />
					</Form.Group>
					<Form.Group controlId='lastname'>
						<Form.Label>Last name</Form.Label>
						<Form.Control type='lastname' defaultValue={props.donor.lastname} />
					</Form.Group>
					<Form.Group controlId='phone'>
						<Form.Label>Phone Number</Form.Label>
						<Form.Control type='phone' defaultValue={props.donor.phone} />
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type='email' defaultValue={props.donor.email} />
					</Form.Group>
					<Form.Group controlId='yeartotal'>
						<Form.Label>Year Total</Form.Label>
						<Form.Control
							type='yeartotal'
							defaultValue={props.donor.yeartotal}
						/>
					</Form.Group>
					<Form.Group controlId='lastgift'>
						<Form.Label>Last gift amount</Form.Label>
						<Form.Control type='lastgift' defaultValue={props.donor.lastgift} />
					</Form.Group>
					<Form.Group controlId='lastgiftdate'>
						<Form.Label>Last gift date MM/DD/YY</Form.Label>
						<Form.Control
							type='lastgiftdate'
							defaultValue={props.donor.lastgiftdate}
						/>
					</Form.Group>
					<Form.Group controlId='nextlastgift'>
						<Form.Label>Next to last gift amount</Form.Label>
						<Form.Control
							type='nextlastgift'
							defaultValue={props.donor.nextlastgift}
						/>
					</Form.Group>
					<Form.Group controlId='nextlastgiftdate'>
						<Form.Label>Next to last gift date MM/DD/YY</Form.Label>
						<Form.Control
							type='nextlastgiftdate'
							defaultValue={props.donor.nextlastgiftdate}
						/>
					</Form.Group>
					<Form.Group controlId='paymentnum'>
						<Form.Label>Total donations made</Form.Label>
						<Form.Control
							type='paymentnum'
							defaultValue={props.donor.paymentnum}
						/>
					</Form.Group>
					<Form.Group controlId='comments'>
						<Form.Label>Comments</Form.Label>
						<Form.Control type='comments' defaultValue={props.donor.comments} />
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
}

export default EditDonor;
