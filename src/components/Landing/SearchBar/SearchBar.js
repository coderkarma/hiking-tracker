import React, { Component } from 'react';
import { Row, Card, Col, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import TrailModel from '../TrailModel';
import './SearchBar.css';
import { baseUrl } from '../../../config/variables';
import SearchIcon from '@material-ui/icons/Search';

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

		axios
			.get(`${baseUrl}/trails/details/ ${trailsId}`)
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
		let address = this.state.value.replace(/\s/g, '+');
		let url = `${baseUrl}/trails/geolocation/${address}`;

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
			this.setState({
				location: location.trails,
				value: '',
			});
		});
	};

	// !?   Add the trail on the user profile
	addTrail = (trail) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}

		axios
			.post(
				`${baseUrl}/trails/add`,
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
		let trailCards = this.state.location
			? this.state.location.map((trail, idx) => {
					return (
						<Col xs={12} md={4} lg={4} key={idx}>
							<Card className='api-cards animated slideInUp shadow'>
								<Card.Img
									variant='top'
									data-id={trail.id}
									src={trail.imgMedium}
									onClick={this.showModel}
									className='card-image'
								/>
								<Card.Body>
									<Card.Title>{trail.name}</Card.Title>
									<span>
										<Button
											className='rounded-circle'
											onClick={() =>
												this.addTrail(trail)
											}>
											Save
										</Button>
									</span>
								</Card.Body>
							</Card>
						</Col>
					);
			  })
			: '';

		return (
			<div>
				<Form className='py-3 rounded' onSubmit={this.handleSubmit}>
					<input
						type='text'
						value={this.state.value}
						onChange={this.handleChange}
						placeholder='Search Trails by City'
					/>
					<SearchIcon fontSize='large' />
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
