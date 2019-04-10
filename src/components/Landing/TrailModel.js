import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TrailModel.css';
import axios from 'axios';

class TrailModel extends Component {
	state = {
		lgShow: false,
		comments: '',
		newComment: ''
	};

	saveComment = () => {
		axios.post('http://localhost:3001/comment', {
			body: this.state.newComment,
			userId: localStorage.user_id,
			trailId: this.trailDetails.id,
			dateCreated: ''
		});
	};

	
	commentHandleChange = () => {
		this.setState({
			lgShow: true,
			comments: this.state.comments,
			newComment: this.state.newComment

		})
	};

	fetchComments = () => {
		console.log('in show comments');
		axios
			.get(`http://localhost:3001/trails/comments/${this.props.trailDetails.id}`)
			.then(response => {
				console.log(response);
				this.setState({
					comments: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

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

				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">Trail Comment Should go here!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form action="POST">
						<textarea name="comment" id="comment" cols="30" rows="10" />
						<input type="submit" value="submit" onSubmit={this.props.commentHandleChange} />
					</form>
					<Button onClick={() => this.fetchComments()}>Show Comments</Button>
				</Modal.Body>
			</Modal>
		);
	}
}
export default TrailModel;
