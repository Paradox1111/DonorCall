import React from "react";
import { Container, Modal, Button, Form, Row, Col } from "react-bootstrap";

function Login(props) {
	return (
		<Container className='login'>
			<Row>
				<Col>
					<Modal.Dialog className='modal-dialog-centered modal-fade'>
						<Modal.Header>
							<Modal.Title>
								Please enter your user name and password
							</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Form onSubmit={props.handleLogin}>
								<Form.Group>
									<Form.Label id='username' name='username'>
										User name:
									</Form.Label>
									<Form.Control
										className='loginInput'
										type='text'
										htmlFor='username'
										id='username'
										name='username'
									/>
									<Form.Label id='password' name='password'>
										Password:
									</Form.Label>
									<Form.Control
										className='loginInput'
										type='password'
										htmlFor='password'
										id='password'
										name='password'
									/>
									<Button
										className='cancelBtn'
										onClick={props.hideLogin}
										variant='secondary'
									>
										Cancel
									</Button>
									<Button
										onClick={() => {
											setTimeout(() => {
												props.hideLogin();
											}, 250);
										}}
										id={props.id}
										type='submit'
										variant='primary'
										className='loginBtn'
									>
										Login
									</Button>
								</Form.Group>
							</Form>
						</Modal.Body>

						<Modal.Footer></Modal.Footer>
					</Modal.Dialog>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
