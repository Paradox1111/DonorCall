import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function DonorModal(props) {
	if (props.donor) {
		return (
			<Modal
				show={props.show}
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				onHide={props.handleHide}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						{props.donor.orgName} {props.donor.lastname && props.donor.lastname}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
						{props.donor.phone != "" ? (
							<ListGroup.Item variant='info'>
								Phone: {props.donor.phone}
							</ListGroup.Item>
						) : (
							<ListGroup.Item variant='info' disabled>
								No phone number available
							</ListGroup.Item>
						)}
						<ListGroup.Item variant='secondary'>
							Email: {props.donor.email}
						</ListGroup.Item>
						<ListGroup.Item variant='info'>
							Year total: {props.donor.yeartotal}
						</ListGroup.Item>
						<ListGroup.Item variant='secondary'>
							Last gift: {props.donor.lastgift}, {props.donor.lastgiftdate}
						</ListGroup.Item>
						{props.donor.nextlastgift !== "" ? (
							<ListGroup.Item variant='info'>
								Next to last gift: {props.donor.nextlastgift},{" "}
								{props.donor.nextlastgiftdate}
							</ListGroup.Item>
						) : (
							<ListGroup.Item variant='info'>
								Next to last gift: N/A
							</ListGroup.Item>
						)}
						{props.donor.paymentnum ? (
							<ListGroup.Item variant='secondary'>
								Donations made: {props.donor.paymentnum}
							</ListGroup.Item>
						) : (
							<ListGroup.Item variant='secondary'>
								Donations made: 1
							</ListGroup.Item>
						)}
						<ListGroup.Item variant='info'></ListGroup.Item>
					</ListGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.handleHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return null;
	}
}

export default DonorModal;
