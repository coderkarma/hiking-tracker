import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Form, Col } from 'react-bootstrap';
import './Profile.css';
class Profile extends Component {
	state = {
		displayname: '',
		email: '',
		trailId: localStorage.getItem('userId'),
		password: '',
		trails: [],
		datejoined: ''
	};

	deleteTrail = id => {
		const token = localStorage.getItem('token');
		axios
			.delete(`http://localhost:3001/trails/remove/${id}`, {
				headers: {
					'x-token': token
				}
			})
			.then(() => {
				this.props.refreshUser();
			});
	};

	onHandleChange = e => {
		console.log(this.state);
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// ! Making axios call for edit user's profile
	editProfileHandle = e => {
		e.preventDefault();
		let id = this.props.user._id;

		let updateData = {};
		if (this.state.displayname !== '') {
			updateData['displayname'] = this.state.displayname;
		}
		if (this.state.email !== '') {
			updateData['email'] = this.state.email;
		}
		console.log(updateData);
		axios.put(`http://localhost:3001/users/${id}`, updateData).then(() => {
			this.props.refreshUser();
		});
	};

	render() {
		const { user } = this.props;
		return (
			<div>
				<h1 className="profile"> Welcome {user.displayname} </h1>
				<div>
					<h5>Email: {user.email}</h5>
				</div>
				<div>
					<p>DateJoined: {Date().toLocaleString()}</p>
				</div>

				<Form.Group action="PUT">
					<input
						type="text"
						placeholder={user.displayname}
						onChange={this.onHandleChange}
						name="displayname"
					/>
					<input type="text" placeholder={user.email} onChange={this.onHandleChange} name="email" />
					<button onClick={this.editProfileHandle} variant="info">
						Edit
					</button>
				</Form.Group>

				<p className="list-trail">List your trail to visit in future!!</p>

				<div>
					{user.trails.map(trail => {
						if (!trail) {
							return null;
						}

						let savedTrailsCard = (
							<Col xs={6} md={4} lg={4}>
								<Card className="profile-card">
									<Card.Img src={trail.imgMedium} alt={trail.name} />
									<Card.Body>
										<Card.Title>{trail.name}</Card.Title>

										<Card.Text>{trail.summary}</Card.Text>
										<Card.Text>
											<i className="fas fa-star">{trail.stars}</i>
										</Card.Text>
									</Card.Body>
									<Button variant="danger" onClick={() => this.deleteTrail(trail.id)}>
										Remove
									</Button>
								</Card>
							</Col>
						);
						return (
							<div className="d-inline-block">
								{/* <Container className="saved-card"> */}
								{/* <Row> */}
								{/* <Col xs={6} md={4} lg={4}>
									<Card className="profile-card">
										<img src={trail.imgMedium} alt={trail.name} />
										<Card.Title>{trail.name}</Card.Title>

										<Card.Text>{trail.summary}</Card.Text>
										<Button variant="danger" onClick={() => this.deleteTrail(trail.id)}>
											Remove
										</Button>
									</Card>
								</Col> */}
								{/* </Row> */}
								{/* </Container> */}
								<Container className="searched-trail">
									<Row>{savedTrailsCard}</Row>
								</Container>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
export default Profile;
