import React, { Component } from 'react';
import axios from 'axios';

class SearchBar extends Component {
	state = {
		value: ''
	};

	handleChange = event => {
		this.setState({
			value: event.target.value
		});
	};

	getLocation = e => {
		// 1600+Amphitheatre+Parkway,+Mountain+View,+CA
		// let address = this.state.value.replace(/\s/g, '+');

		axios.get('http://localhost:3001/trails/geolocation/:city').then(response => response.json());
		// .then(json => json);
	};

	handleSubmit = e => {
		e.preventDefault();
		this.getLocation()
			.then(location => {
				location.json();
			})
			.then(allTrails => console.log('you are here', JSON.stringify(allTrails)));
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<button type="submit"> Search</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
