import React, { Component } from 'react';

class SearchBar extends Component {
	state = {
		value: ''
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
			console.log('you are here');
			console.log(location.trails);
		});
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<button type="submit"> Search </button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
