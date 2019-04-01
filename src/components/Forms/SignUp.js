import React, { Component } from 'react';

class SignUp extends Component {
	render() {
		return (
			<div>
				<form action="">
					<input type="text" name="email" placeholder="email" />
					<input type="text" placeholder="password" />
					<button>Submit </button>
				</form>
			</div>
		);
	}
}
export default SignUp;
