import React, { Component } from 'react';
import {  Modal } from 'react-bootstrap';
import './TrailModel.css'
import axios from 'axios'

class TraiModel extends Component {
	// constructor(props) {
	// 	super(props);

		// this.
		state = {
			lgShow: false
		};
	// }

	render() {
		console.log(this.props.trailDetails)
		return (
			<Modal
				size="lg"
				show={this.props.showDetail}
				onHide={this.props.hideDetail}
				aria-labelledby="example-modal-sizes-title-lg"
			>	
			{/* Here image needs to be stored to display in the modal and comment needs to go here */}

				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">Trail Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>hello</Modal.Body>
			</Modal>
		);
	}
}
export default TraiModel;
