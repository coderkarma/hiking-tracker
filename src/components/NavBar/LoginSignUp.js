import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';

function LoginForm(props) {
	return (
		<div>
			<form>
				<TextField>
					<input type="email" name="email" placeholder="email" />
				</TextField>
				<input type="password" name="password" placeholder="password" />

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
				<input type="email" name="email" placeholder="email" />
				<input type="password" name="password" placeholder="password" />

				<button onClick={props.handleSubmit}>Submit </button>
				{/* <Redirect to="/profile" /> */}
			</form>
		</div>
	);
}

class LoginSignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: null,
			open: false,
			username: null,
			password: null
		};
	}

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

	render() {
		const FormsFront = this.state.type === 'login' ? <LoginForm /> : <SignUpForm />;
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
							Save changes
						</Button>
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
