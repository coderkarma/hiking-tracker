import React, { Component } from 'react';

class Profile extends Component {
	state = {
		displayname: '',
		email: '',
		trailId: localStorage.getItem('userId'),
		password: '',
		trails: []
	};

	render() {
		return (
			<div>
				<h1> This is a profile page !!! hello karma</h1>
			</div>
		);
	}
}
export default Profile;
