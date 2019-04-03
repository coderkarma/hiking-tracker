import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:3001/users/signup', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				localStorage.token = response.data.signedJwt;
				console.log('response', response);
				this.setState({
					isLoggedIn: true,
					user: response.data.user
				});
				this.props.handleLogin(response);
			})
			.catch(err => console.log(err));
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<form action="">
					<input type="text" name="username" placeholder="username" />
					<input type="email" name="email" placeholder="email" onChange={this.handleChange} />
					<input type="password" name="password" placeholder="password" onChange={this.handleChange} />

					<button onClick={this.handleSubmit}>Submit </button>
				</form>
			</div>
		);
	}
}
export default SignUp;
