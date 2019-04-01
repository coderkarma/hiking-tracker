import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';

import './App.css';
import MyRoutes from './config/routes';


class App extends Component {
	
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
