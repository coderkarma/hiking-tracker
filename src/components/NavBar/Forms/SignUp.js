import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
	state = {
		email: '',
		password: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = () => {
		axios
			.post('http://localhost:3001/users/signup', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				localStorage.token = response.data.signedJwt;

				
			})
			.catch(err => console.log(err));
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<input type="text" name="email" placeholder="email" onChange={this.handleChange} />
				<input type="text" name="password" placeholder="password" onChange={this.handleChange} />
				<button onClick={this.handleSubmit}>Submit </button>
			</div>
		);
	}
}
export default SignUp;
