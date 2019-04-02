import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/Landing/SearchBar/SearchBar';

import './App.css';
import MyRoutes from './config/routes';

class App extends Component {
	// this.setState({
				// 	isLoggedIn: true,
				// 	user: response.data.user
				// });
	render() {
		return (
			<div className="App">
				<NavBar />
				{MyRoutes}
				<SearchBar />
			</div>
		);
	}
}

export default App;
