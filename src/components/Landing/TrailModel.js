import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './TrailModel.css';
// import axios from 'axios';

class TrailModel extends Component {
	state = {
		lgShow: false
	};

	// componentDidMount = e => {
	// 	e.preventDefult();
	// 	axios.post('http://localhost:3001/comment', {
	// 		body: this.state.body,
	// 		userId: this.state.user_id,
	// 		trailId: this.state.trailId,
	// 		DateCreated: this.state.dateCreated
	// 	});
	// };

	render() {
		console.log(this.props.trailDetails);
		return (
			<Modal
				size="lg"
				show={this.props.showDetail}
				onHide={this.props.hideDetail}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				{/* Here image needs to be stored to display in the modal and comment needs to go here */}
				<form action="POST">
					<textarea name="comment" id="comment" cols="30" rows="10" />
					<input type="submit" value="submit" />
				</form>

				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">Trail Comment is here</Modal.Title>
				</Modal.Header>
				<Modal.Body>Hello</Modal.Body>
			</Modal>
		);
	}
}
export default TrailModel;
