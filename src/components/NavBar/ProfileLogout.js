import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ProfileLogout extends Component {
	render() {
		return (
			<div>
				<Button onClick={this.props.handleLogout} color="inherit">
					Logout
				</Button>
				<Button onClick={this.props.editProfile} color="inherit">
					Profile
				</Button>
			</div>
		);
	}
}
export default ProfileLogout;
