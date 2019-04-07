import React, { Component } from 'react';
import { Row, Card, Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
class SearchBar extends Component {
	state = {
		value: '',
		location: '',
		trailId: ''
	};

	handleChange = event => {
		event.preventDefault();
		this.setState({
			value: event.target.value
		});
	};

	getLocation = e => {
		// remove white space and add plus for t
		let address = this.state.value.replace(/\s/g, '+');
		let url = `http://localhost:3001/trails/geolocation/${address}`;
		console.log(url);
		let promise = fetch(url).then(response => response.json());
		return promise;
	};

	handleSubmit = e => {
		e.preventDefault();
		this.getLocation().then(location => {
			console.log(location);
			this.setState({
				location: location.trails
			});
			console.log('you are here:', this.state.location[0].imgMedium);
		});
	};

	// !!Todo - add the trail based on
	addTrail = trail => {
		console.log(this.props);
		const token = localStorage.getItem('token');
		if (!token) {
			// Handle if the user is not logged in
			return;
		}
		axios
			.post(
				'http://localhost:3001/trails/add',
				{ trail },
				{
					headers: {
						'x-token': token
					}
				}
			)
			.then(() => {
				this.props.refreshUser();
			});
	};

	render() {
		let trailCards = this.state.location
			? this.state.location.map((trail, idx) => {
					return (
						<Col xs={6} md={4} lg={4}>
							<Card>
								<Card.Img variant="top" src={trail.imgMedium} key={idx} />
								<Card.Title>{trail.name}</Card.Title>
								{/* trail id need to add the trail when save button fires only for loggedIn users
									 */}
								<Button onClick={() => this.addTrail(trail)}>Save</Button>
							</Card>
						</Col>
						// <Col xs={6} md={4} lg={4}>
						// 	<Card>
						// 		<Card.Img variant="top" src={trail.imgMedium} key={idx} />

						// 		<Card.Title>{trail.name}</Card.Title>
						// 		<Button>Save</Button>
						// 	</Card>
						// </Col>

						// <Col xs={6} md={4} lg={4}>
						// 	<Card>
						// 		<Card.Img variant="top" src={trail.imgMedium} key={idx} />

						// 		<Card.Title>{trail.name}</Card.Title>
						// 		<Button>Save</Button>
						// 	</Card>
						// </Col> */}
					);
				})
			: '';

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Search Trails by City"
					/>
				</Form>
				<Container>
					<Row>{trailCards}</Row>
				</Container>
			</div>
		);
	}
}

export default SearchBar;
