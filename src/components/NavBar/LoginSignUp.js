import React, { Component } from 'react';
// import Login from './Forms/Login';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';

function LoginForm(props) {
	return (
		<div>
			<form>
				<input type="email" name="loginemail" placeholder="email" onChange={props.handleChange} />
				<input type="password" name="loginpassword" placeholder="password" onChange={props.handleChange} />

				<button onClick={props.handleSubmit}>Login </button>
				{/* <Redirect to="/profile" /> */}
			</form>
		</div>
	);
}
function SignUpForm(props) {
	return (
		<div>
			{/* <p>sign up</p> */}
			<form>
				<input type="text" name="displayname" placeholder="Display Name" onChange={props.handleChange} />
				<input type="email" name="signupemail" placeholder="email" onChange={props.handleChange} />
				<input type="password" name="signuppassword" placeholder="password" onChange={props.handleChange} />

				<button onClick={props.handleSubmit}>Submit </button>
				{/* <Redirect to="/profile" /> */}
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
		signupemail: null
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
		if (ths.state.type === 'login') {
			axios
				.post('http://localhost:3001/users/login', {
					email: ths.state.loginemail,
					password: ths.state.loginpassword
				})
				.then(response => {
					localStorage.token = response.data.signedJwt;
					console.log('response', response);

					ths.props.handleLogin();
				})
				.catch(err => console.log(err));
		} else if (ths.state.type === 'signup') {
			axios
				.post('http://localhost:3001/users/signup', {
					email: this.state.signupemail,
					password: this.state.signuppassword,
					displayname:this.state.displayname
				})
				.then(response => {
					localStorage.token = response.data.signedJwt;
					console.log('response', response);
					ths.props.handleLogin();
				})
				.catch(err => console.log(err));
		}
	};

	render() {
		const FormsFront =
			this.state.type === 'login' ? (
				<LoginForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
			) : (
				<SignUpForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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
					<DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
						Modal title
					</DialogTitle>
					<DialogContent>{FormsFront}</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
export default LoginSignUp;
