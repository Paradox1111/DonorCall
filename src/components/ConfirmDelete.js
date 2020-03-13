import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function ConfirmDelete(props) {
	return (
		<Modal
			show={props.showDelete}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
			onHide={() => {
				props.handlehide("delete");
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Are you sure you wish to delete this donor?
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>This cannot be undone!</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={e => {
						e.preventDefault();
						props.handlehide("delete");
						props.deleteDonor(e, props.donor.id);
					}}
					variant='danger'
				>
					Delete
				</Button>
				<Button
					onClick={() => {
						props.handlehide("delete");
					}}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmDelete;
