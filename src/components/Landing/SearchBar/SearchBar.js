import React, { Component } from 'react';
import { Grid, Card, CardMedia } from '@material-ui/core';

class SearchBar extends Component {
	state = {
		value: '',
		location: ''
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
			this.setState({
				location: location.trails
			});
			console.log('you are here:', this.state.location[0].imgMedium);
		});
	};
	render() {
		let images = this.state.location
			? this.state.location.map(trail => {
					return <img src={trail.imgSmall} alt="imageTrail" />;
				})
			: '';

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<button type="submit"> Search </button>
				</form>
				<Grid>
					<Card>
						<CardMedia>{images}</CardMedia>
					</Card>
				</Grid>

				{/* <img src="this.state.location[0].imgMedium" /> */}
			</div>
		);
	}
}

export default SearchBar;
