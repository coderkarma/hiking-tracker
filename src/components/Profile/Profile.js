import React, { Component } from 'react';
import axios from 'axios';
class Profile extends Component {
	state = {
		displayname: '',
		email: '',
		trailId: localStorage.getItem('userId'),
		password: '',
		trails: []
	};

	deleteTrail = id => {
		const token = localStorage.getItem('token');
		axios
			.delete(`http://localhost:3001/trails/remove/${id}`, {
				headers: {
					'x-token': token
				}
			})
			.then(() => {
				this.props.refreshUser();
			});
	};

	render() {
		const { user } = this.props;
		return (
			<div>
				<h1> This is a profile page !!! hello karma</h1>
				<div>Display name: {user.displayname}</div>
				<div>Email: {user.email}</div>
				<div>
					{user.trails.map(t => {
						if (!t) {
							return null;
						}
						return (
							<div key={t.id}>
								<img src={t.imgMedium} alt={t.name} />
								<button onClick={() => this.deleteTrail(t.id)}>Remove</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
export default Profile;
