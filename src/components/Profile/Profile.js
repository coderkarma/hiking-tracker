import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Form, Col, Jumbotron } from 'react-bootstrap';
import './Profile.css';
import { Animated } from 'react-animated-css';
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
		let actualHostName = window.location.hostname;
		let apiUrl = 'http://localhost:3000';

		if (actualHostName !== 'localhost') {
			apiUrl = 'https://agile-fjord-52758.herokuapp.com';
		}
		axios
			.delete(`${apiUrl}/trails/remove/${id}`, {
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
		let actualHostName = window.location.hostname;
			let apiUrl = 'http://localhost:3000';

			if (actualHostName !== 'localhost') {
				apiUrl = 'https://agile-fjord-52758.herokuapp.com';
			}

		axios.put(`${apiUrl}/users/${id}`, updateData).then(() => {
			this.props.refreshUser();
		});
	};

	render() {
		const { user } = this.props;
		return (
			<div>
				<Jumbotron>
					<Animated animationIn="bounceInRight" animationOut="fadeOut" isVisible={true}>
						<h1 className="profile animated"> Welcome {user.displayname} </h1>
					</Animated>

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

					<p className="list-trail">List your hiking trails to visit in future!!</p>
				</Jumbotron>
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
