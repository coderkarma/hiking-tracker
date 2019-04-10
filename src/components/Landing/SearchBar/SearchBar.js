import React, { Component } from 'react';
import { Row, Card, Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import TrailModel from '../TrailModel';
import './SearchBar.css';
class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			location: '',
			trailId: '',
			trailsDetailModel: false,
			selectedTrailsDetail: ''
		};
	}

	handleChange = event => {
		event.preventDefault();
		this.setState({
			value: event.target.value
		});
	};

	showModel = e => {
		let trailsId = e.target.dataset.id;
		axios
			.get(`http://localhost:3001/trails/details/ ${trailsId}`)
			.then(response => {
				console.log(response.data.trails);
				this.setState({
					trailsDetailModel: true,
					selectedTrailsDetail: response.data.trails[0]
				});
			})
			.catch(err => {
				console.log(err);
			});
	};
	hideModel = e => {
		this.setState({
			trailsDetailModel: false
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
			// console.log('you are here:', this.state.location[0].imgMedium);
		});
	};

	// !?   Add the trail on the user profile
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
		console.log(this.state.selectedTrailsDetail);
		let trailCards = this.state.location
			? this.state.location.map((trail, idx) => {
					return (
						<Col xs={6} md={4} lg={4} key={idx}>
							<Card className="api-cards">
								<Card.Img
									variant="top"
									data-id={trail.id}
									src={trail.imgMedium}
									onClick={this.showModel}
								/>
								<Card.Body>
									<Card.Title>{trail.name}</Card.Title>
									{/* <Card.text>{trail.summary}</Card.text>  */}
								</Card.Body>
								<Button onClick={() => this.addTrail(trail)}>Save</Button>
							</Card>
						</Col>
					);
				})
			: '';

		return (
			<div>
				<Form className="py-3" onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Search Trails by City"
					/>
				</Form>
				<TrailModel
					trailDetails={this.state.selectedTrailsDetail}
					showDetail={this.state.trailsDetailModel}
					hideDetail={this.hideModel}
				/>
				<Container className="searched-trail">
					<Row>{trailCards}</Row>
				</Container>
			</div>
		);
	}
}

export default SearchBar;
