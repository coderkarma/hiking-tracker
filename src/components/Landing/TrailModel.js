import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './TrailModel.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { baseUrl } from '../../config/variables';

class TrailModel extends Component {
	state = {
		lgShow: false,
		comments: '',
		newComment: '',
	};

	saveComment = (e) => {
		e.preventDefault();
		let decoded = jwt_decode(localStorage.token);

		console.log(decoded);

		let comment = {
			body: this.state.newComment,
			userId: decoded._id,
			trailId: this.props.trailDetails.id,
			dateCreated: new Date().toLocaleString(),
		};

		console.log(comment);

		axios.post(`${baseUrl}/comment`, comment);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	fetchComments = (e) => {
		e.preventDefault();
		console.log('in show comments');
		axios
			.get(`${baseUrl}/trails/comments/${this.props.trailDetails.id}`)
			.then((response) => {
				console.log(response);
				this.setState({
					comments: response.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		// let trailComments = this.state.comments;
		// trailComments.filter(comment=>{})
		let comment = this.state.comments
			? this.state.comments.map((comment) => {
					return (
						<div>
							<h1>{comment.body}</h1>
						</div>
					);
			  })
			: null;

		return (
			<Modal
				size='lg'
				show={this.props.showDetail}
				onHide={this.props.hideDetail}
				aria-labelledby='example-modal-sizes-title-lg'>
				<Modal.Header closeButton>
					<Modal.Title id='example-modal-sizes-title-lg'>
						All comments for this trail
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<textarea
						id='comment'
						cols='10'
						rows='10'
						name='newComment'
						onChange={this.handleChange}
					/>
					<input
						type='button'
						value='submit'
						onClick={this.saveComment}
					/>
					<input
						type='button'
						value='Show Comments'
						onClick={this.fetchComments}
					/>
					{comment}
				</Modal.Body>
			</Modal>
		);
	}
}
export default TrailModel;
