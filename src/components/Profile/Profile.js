import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Form } from 'react-bootstrap';
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

	//
	componentDidMount() {
		let id = this.props.user._id;
		console.log('this is id that iam looking for', id);
	}

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

				<p>List your tails to visit in future!!</p>

				<div>
					{user.trails.map(trail => {
						if (!trail) {
							return null;
						}
						return (
							<div key={trail.id}>
								<Container>
									<Row>
										<Card className="profile-card">
											<img src={trail.imgMedium} alt={trail.name} />
											<Card.Title>{trail.name}</Card.Title>

											<Card.Text>{trail.summary}</Card.Text>
											<Button variant="danger" onClick={() => this.deleteTrail(trail.id)}>
												Remove
											</Button>
										</Card>
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
