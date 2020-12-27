import React, { Component } from 'react';
import axios from 'axios';
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { baseUrl } from '../../config/variables';
import './LoginSignUp.css';

function LoginForm({ handleChange, handleSubmit, errorMessage }) {
	return (
		<div>
			<form className='login-form'>
				<TextField
					type='email'
					name='loginemail'
					label='Email'
					variant='outlined'
					onChange={handleChange}
				/>
				<TextField
					type='password'
					name='loginpassword'
					label='Password'
					variant='outlined'
					onChange={handleChange}
				/>

				<Button onClick={handleSubmit}>Login </Button>
				{/* <Redirect to="/profile" /> */}
			</form>
			{errorMessage === false ? null : <p>incorrect password or email</p>}
		</div>
	);
}
function SignUpForm(props) {
	return (
		<div className='signup-form-container'>
			<form className='signup-form'>
				<TextField
					type='text'
					name='displayname'
					placeholder='Display Name'
					variant='outlined'
					label='Displayname'
					onChange={props.handleChange}
					margin='normal'
				/>
				<TextField
					type='email'
					name='signupemail'
					variant='outlined'
					label='Email'
					placeholder='email'
					onChange={props.handleChange}
					margin='normal'
				/>
				<TextField
					type='password'
					name='signuppassword'
					variant='outlined'
					label='Password'
					placeholder='password'
					onChange={props.handleChange}
					margin='normal'
				/>

				<Button onClick={props.handleSubmit}>Submit</Button>
				{props.errorMessage === false ? null : (
					<p className='text-center'>User already exists!</p>
				)}
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
		errorMessage: false,
	};

	showModel = (type) => {
		this.setState({
			type: type,
			open: true,
		});
	};
	handleClose = () => {
		this.setState({
			type: null,
			open: false,
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const ths = this;
		const { signupemail, signuppassword, displayname, type } = this.state;

		if (type === 'login') {
			axios
				.post(`${baseUrl}/users/login`, {
					email: ths.state.loginemail,
					password: ths.state.loginpassword,
				})
				.then(
					(response) => {
						localStorage.setItem('token', response.data.signedJwt);
						ths.props.handleLogin(response.data.user);
					},
					(err) => {
						this.setState({
							errorMessage: true,
						});
					}
				)
				.catch((err) => console.log(err));
		} else if (type === 'signup') {
			axios
				.post(`${baseUrl}/users/signup`, {
					email: signupemail,
					password: signuppassword,
					displayname: displayname,
				})
				.then(
					(response) => {
						localStorage.token = response.data.signedJwt;
						ths.props.handleLogin(response.data.user);
					},
					(err) => {
						this.setState({
							errorMessage: true,
						});
					}
				)
				.catch((err) => console.log(err));
		}
	};

	render() {
		const { type } = this.state;
		const FormsFront =
			type === 'login' ? (
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
				<Button
					onClick={(e) => this.showModel('login')}
					color='inherit'>
					Login
				</Button>
				<Button
					onClick={(e) => this.showModel('signup')}
					color='inherit'>
					SignUp
				</Button>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby='login'
					open={this.state.open}>
					<DialogTitle id='login' onClose={this.handleClose} />
					<DialogContent>{FormsFront}</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color='primary'>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
export default LoginSignUp;
