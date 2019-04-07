import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ProfileLogout extends Component {
	render() {
		return (
			<div>
				<Button onClick={this.props.handleLogout} color="inherit">
					Logout
				</Button>
				<Link to="/profile" color="inherit">
					Profile
				</Link>
			</div>
		);
	}
}
export default ProfileLogout;
