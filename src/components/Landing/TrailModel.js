import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TrailModel.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class TrailModel extends Component {
	state = {
		lgShow: false,
		comments: '',
		newComment: ''
	};

	saveComment = e => {
		e.preventDefault();
		let decoded = jwt_decode(localStorage.token);

		console.log(decoded);

		let comment = {
			body: this.state.newComment,
			userId: decoded._id,
			trailId: this.props.trailDetails.id,
			dateCreated: new Date().toLocaleString()
		};

		console.log(comment);

		axios.post('http://localhost:3001/comment', comment);
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	fetchComments = (e) => {
		e.preventDefault()
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
		console.log(this.state.comments);
		let comment = this.state.comments? this.state.comments.map(comment => {
			return (<p>{comment.body}</p>)
		}) : null
		
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
					<textarea id="comment" cols="30" rows="10" name="newComment" onChange={this.handleChange} />
					<input type="button" value="submit" onClick={this.saveComment} />
					<input type="button" value="Show Comments" onClick={this.fetchComments} />
					{comment}
				</Modal.Body>
			</Modal>
		);
	}
}
export default TrailModel;
