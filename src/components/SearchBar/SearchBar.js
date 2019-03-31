import React, { Component } from 'react';

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
		let address = this.state.value.replace(/\s/g, '+');
		
		console.log(url);
		let promise = fetch(url).then(response => response.json());
		// .then(json => json);
		return promise;
	};

	componentDidMount() {}

	handleSubmit = e => {
		e.preventDefault();
		this.getLocation()
			.then(location => {
				let lat = location.results[0].geometry.location.lat;
				let lng = location.results[0].geometry.location.lng;

				console.log('handle submit', JSON.stringify(location));
				let promise = fetch(
					
				).then(response => response.json());
				return promise;
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
