import React, { Component } from 'react';

class EditProfile extends Component {
	

	render() {
		return (
			<div>
				<h1>Editing profile page</h1>
				<form action="">
					<input type="text" name="displayname" placeholder="Display Name"/>
					<button>Edit</button>
				</form>
			</div>
		);
	}
}
export default EditProfile;
