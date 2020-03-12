import React, { useEffect } from "react";
import ls from "local-storage";
import axios from "axios";
import { Card, Button, Col, Row, ListGroup } from "react-bootstrap";

function Stewards(props) {
	useEffect(() => {
		const access = ls.get("user").tokens.access;
		getStewards(access);
	});
	const getStewards = access => {
		const config = {
			headers: { Authorization: `Bearer ${access}` }
		};
		const url = "https://donor-call-api.herokuapp.com/stewards";
		axios
			.get(url, config)
			.then(response => {
				if (response.statusText !== "OK") {
					props.refresh();
					setTimeout(() => {
						getStewards(access);
					}, 500);
				} else {
					props.setStewards(response.data);
				}
			})
			.catch(console.error);
	};
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
		return <div>{stewards}</div>;
	} else {
		return <h1>Loading...</h1>;
	}
}

export default Stewards;
