import React, { useEffect } from "react";
import ls from "local-storage";
import axios from "axios";
import { Container, Card, Button, Col, Row, ListGroup } from "react-bootstrap";

function Stewards(props) {
	useEffect(() => {
		const access = ls.get("user").tokens.access;
		props.getStewards(access);
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
