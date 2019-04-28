import React, { Component } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
// import { Form } from 'react-bootstrap';

function LoginForm(props) {
	// console.log( "error message is here", props.errorMessage)
	return (
		<div>
			<form>
				<input type="email" name="loginemail" placeholder="email" onChange={props.handleChange} />
				<input type="password" name="loginpassword" placeholder="password" onChange={props.handleChange} />

				<Button onClick={props.handleSubmit}>Login </Button>
				{/* <Redirect to="/profile" /> */}
			</form>
			{props.errorMessage === false ? null : <p>incorrect password/email</p>}
		</div>
	);
}
function SignUpForm(props) {
	return (
		<div>
			<form>
				<input type="text" name="displayname" placeholder="Display Name" onChange={props.handleChange} />
				<input type="email" name="signupemail" placeholder="email" onChange={props.handleChange} />
				<input type="password" name="signuppassword" placeholder="password" onChange={props.handleChange} />

				<Button onClick={props.handleSubmit}>Submit</Button>
				{props.errorMessage === false ? null : <p>User already exists!</p>}
			</form>
		</div>
	);
}

class LoginSignUp extends Component {
	state = {
		type: null,
		open: false,
		displayname: null,
		loginpassword: null,
		signuppassword: null,
		loginemail: null,
		signupemail: null,
		errorMessage: false
	};

	showModel = type => {
		this.setState({
			type: type,
			open: true
		});
	};
	handleClose = () => {
		this.setState({
			type: null,
			open: false
		});
	};

	handleChange = e => {
		console.log(e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// check to see if the state type  is login or sigin up
	handleSubmit = e => {
		e.preventDefault();
		const ths = this;
		// let trailsId = e.target.dataset.id;
		// let actualHostName = window.location.hostname;
		let apiUrl = 'http://localhost:3000';

		if (ths.state.type === 'login') {
			axios
				.post(`${apiUrl}/users/login`, {
					email: ths.state.loginemail,
					password: ths.state.loginpassword
				})
				.then(
					response => {
						localStorage.setItem('token', response.data.signedJwt);
						// console.log('response', response);
						ths.props.handleLogin(response.data.user);
					},
					err => {
						this.setState({
							errorMessage: true
						});
					}
				)
				.catch(err => console.log(err));
		} else if (ths.state.type === 'signup') {
			axios
				.post(`${apiUrl}/users/signup`, {
					email: this.state.signupemail,
					password: this.state.signuppassword,
					displayname: this.state.displayname
				})
				.then(
					response => {
						localStorage.token = response.data.signedJwt;
						ths.props.handleLogin(response.data.user);
					},
					err => {
						this.setState({
							errorMessage: true
						});
					}
				)
				.catch(err => console.log(err));
		}
	};

	render() {
		const FormsFront =
			this.state.type === 'login' ? (
				<LoginForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					errorMessage={this.state.errorMessage}
				/>
			) : (
				<SignUpForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					errorMessage={this.state.errorMessage}
				/>
			);
		return (
			<div>
				<Button onClick={e => this.showModel('login')} color="inherit">
					Login
				</Button>
				<Button onClick={e => this.showModel('signup')} color="inherit">
					SignUp
				</Button>
				<Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
					<DialogTitle id="customized-dialog-title" onClose={this.handleClose} />
					<DialogContent>{FormsFront}</DialogContent>
					<DialogActions>
						<button onClick={this.handleClose} color="primary">
							Close
						</button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
export default LoginSignUp;
