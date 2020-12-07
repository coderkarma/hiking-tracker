import React, { Component } from 'react';
import { Row, Card, Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import TrailModel from '../TrailModel';
import './SearchBar.css';

// import env from '../../../env.json';
class SearchBar extends Component {
	state = {
		value: '',
		location: '',
		trailId: '',
		trailsDetailModel: false,
		selectedTrailsDetail: '',
	};

	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			value: event.target.value,
		});
	};

	showModel = (e) => {
		let trailsId = e.target.dataset.id;
		let actualHostName = window.location.hostname;
		let apiUrl = 'http://localhost:3000';

		if (actualHostName !== 'localhost') {
			apiUrl = 'https://agile-fjord-52758.herokuapp.com';
		}

		axios
			.get(`${apiUrl}/trails/details/ ${trailsId}`)
			.then((response) => {
				//console.log(response.data.trails);
				this.setState({
					trailsDetailModel: true,
					selectedTrailsDetail: response.data.trails[0],
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	hideModel = (e) => {
		this.setState({
			trailsDetailModel: false,
		});
	};
	getLocation = (e) => {
		let actualHostName = window.location.hostname;
		let apiUrl = 'http://localhost:3000';

		if (actualHostName !== 'localhost') {
			apiUrl = 'https://agile-fjord-52758.herokuapp.com';
		}

		// remove white space and add plus for t
		let address = this.state.value.replace(/\s/g, '+');
		let url = `${apiUrl}/trails/geolocation/${address}`;

		let promise = fetch(url)
			.then((response) => response.json())
			.catch((err) => {
				console.log('error occured', err);
			});
		return promise;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.getLocation().then((location) => {
			// console.log(location);
			this.setState({
				location: location.trails,
			});
			// console.log('you are here:', this.state.location[0].imgMedium);
		});
	};

	// !?   Add the trail on the user profile
	addTrail = (trail) => {
		// console.log(this.props);
		const token = localStorage.getItem('token');
		if (!token) {
			// Handle if the user is not logged in
			return;
		}
		let actualHostName = window.location.hostname;
		let apiUrl = 'http://localhost:3000';

		if (actualHostName !== 'localhost') {
			apiUrl = 'https://agile-fjord-52758.herokuapp.com';
		}

		axios
			.post(
				`${apiUrl}/trails/add`,
				{ trail },
				{
					headers: {
						'x-token': token,
					},
				}
			)
			.then(() => {
				this.props.refreshUser();
			});
	};

	render() {
		// console.log(this.state.selectedTrailsDetail);
		let trailCards = this.state.location
			? this.state.location.map((trail, idx) => {
					return (
						<Col xs={12} md={4} lg={4} key={idx}>
							<Card className='api-cards animated slideInUp'>
								<Card.Img
									variant='top'
									data-id={trail.id}
									src={trail.imgMedium}
									onClick={this.showModel}
									className='card-image'
								/>
								<Card.Body>
									<Card.Title>{trail.name}</Card.Title>
								</Card.Body>
								<Button onClick={() => this.addTrail(trail)}>
									Save
								</Button>
							</Card>
						</Col>
					);
			  })
			: '';

		return (
			<div>
				<Form className='py-3' onSubmit={this.handleSubmit}>
					<input
						type='text'
						value={this.state.value}
						onChange={this.handleChange}
						placeholder='Search Trails by City'
					/>
				</Form>
				<TrailModel
					trailDetails={this.state.selectedTrailsDetail}
					showDetail={this.state.trailsDetailModel}
					hideDetail={this.hideModel}
				/>
				<Container className='searched-trail'>
					<Row>{trailCards}</Row>
				</Container>
			</div>
		);
	}
}

export default SearchBar;
