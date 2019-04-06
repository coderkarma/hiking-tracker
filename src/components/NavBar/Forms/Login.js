// import React, { Component } from 'react';
// import axios from 'axios';

// class Login extends Component {
// 	state = {
// 		email: '',
// 		password: ''
// 	};

// 	handleChange = e => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		});
// 	};

// 	handleSubmit = e => {
// 		e.preventDeafult();
// 		axios
// 			.post('http://localhost:3001/users/login', {
// 				email: this.state.email,
// 				password: this.state.password
// 			})
// 			.then(response => {
// 				localStorage.token = response.data.signedJwt;
// 			})
// 			.catch(err => console.log(err));
// 	};

// 	render() {
// 		console.log(this.state);
// 		return (
// 			<div>
// 				<form >
// 					<input type="email" name="email" placeholder="email" onChange={this.handleChange} />
// 					<input type="password" name="password" placeholder="password" onChange={this.handleChange} />

// 					<button onClick={this.handleSubmit}>Submit </button>
// 					{/* <Redirect to="/profile" /> */}
// 				</form>
// 			</div>
// 		);
// 	}
// }
// export default Login;
