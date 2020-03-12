import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function DonorModal(props) {
	if (props.donor) {
		return (
			<Modal
				show={props.showDonor}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				onHide={() => {
					props.handlehide("show");
				}}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						{props.donor.orgName} {props.donor.lastname && props.donor.lastname}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
						{props.donor.phone !== "" ? (
							<ListGroup.Item variant='info'>
								Phone: {props.donor.phone}
							</ListGroup.Item>
						) : (
							<ListGroup.Item variant='info' disabled>
								No phone number available
							</ListGroup.Item>
						)}
						{props.donor.email !== "" ? (
							<ListGroup.Item variant='secondary'>
								Email: {props.donor.email}
							</ListGroup.Item>
						) : (
							<ListGroup.Item variant='secondary' disabled>
								No email address available
							</ListGroup.Item>
						)}
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
						<ListGroup.Item variant='info'>
							Comments: {props.donor.comments}
						</ListGroup.Item>
					</ListGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							props.handlehide("showDonor");
							setTimeout(() => {
								props.handleShow("delete");
							}, 250);
						}}
					>
						Delete
					</Button>
					<Button
						variant='outline-info'
						onClick={() => {
							props.handlehide("showDonor");
							setTimeout(() => {
								props.handleShow("edit");
							}, 250);
						}}
					>
						Edit
					</Button>
					<Button
						className='deletBtn'
						variant='outline-info'
						onClick={() => {
							props.handlehide("showDonor");
						}}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return null;
	}
}

export default DonorModal;
