import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import SearchBar from '../Landing/SearchBar/SearchBar';
import trail1 from './trail1.jpeg';
import trail2 from './trail2.jpeg';
import trail3 from './trail3.jpeg';
import './Home.css';

class Home extends Component {
	render(props) {
		return (
			<div>
				<Carousel>
					<Carousel.Item className="carousel-images">
						<img className="d-block w-100" src={trail1} alt="First slide" />
						<Carousel.Caption>
							<h3>Find trails based on your location</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={trail2} alt="Third slide" />

						<Carousel.Caption>
							<h3>Explore Hiking Trails</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={trail3} alt="Third slide" />

						<Carousel.Caption>
							<h3>Hiking Trails are beautiful</h3>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<SearchBar {...this.props} />
			</div>
		);
	}
}
export default Home;
