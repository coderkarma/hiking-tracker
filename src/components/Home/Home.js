import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import SearchBar from '../Landing/SearchBar/SearchBar';
import trail1 from './trail1.jpeg';

class Home extends Component {
	render(props) {
		return (
			<div>
				<Carousel>
					<Carousel.Item>
						<img className="d-block w-100" src={trail1} alt="First slide" />
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src="./trail2.jpeg" alt="Third slide" />

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src="./trail3.jpeg" alt="Third slide" />

						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<SearchBar {...this.props} />
			</div>
		);
	}
}
export default Home;
