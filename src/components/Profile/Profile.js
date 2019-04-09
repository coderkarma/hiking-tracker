import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row } from 'react-bootstrap';
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

	render() {
		const { user } = this.props;
		console.log('result => ', user);

		return (
			<div>
				<h1 className="profile"> Welcome to your profile </h1>
				<h2>Display name: {user.displayname}</h2>
				<div>
					<h4>Email: {user.email}</h4>
				</div>
				<div>
					{user.trails.map(trail => {
						if (!trail) {
							return null;
						}
						return (
							<div key={trail.id}>
								<Container>
									<Row>
										{/* <Col xs={6} md={4} lg={4}> */}
										<Card className="profile-card">
											<img src={trail.imgMedium} alt={trail.name} />
											<Card.Title>{trail.name}</Card.Title>

											<Card.Text>{trail.summary}</Card.Text>
											<Button variant="danger" onClick={() => this.deleteTrail(trail.id)}>
												Remove
											</Button>
										</Card>
										{/* </Col> */}
									</Row>
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
