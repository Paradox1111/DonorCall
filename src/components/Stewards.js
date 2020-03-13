import React, { useEffect } from "react";
import ls from "local-storage";

import { Card, Col, Row, ListGroup } from "react-bootstrap";

function Stewards(props) {
	useEffect(() => {
		if (ls.get("user")) {
			const access = ls.get("user").tokens.access;
			props.getStewards(access);
		} else {
			props.handleShow("login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (props.stewards) {
		let stewards = props.stewards.map(stew => (
			<Col className='stewCol' key={stew.id}>
				<Card className='stewCard text-center' style={{ width: "22rem" }}>
					<Card.Body>
						<Card.Header>{stew.username}</Card.Header>

						<ListGroup></ListGroup>
					</Card.Body>
				</Card>
			</Col>
		));
		return <Row>{stewards}</Row>;
	} else {
		return <h1>Loading...</h1>;
	}
}

export default Stewards;
