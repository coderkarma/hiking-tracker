import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Nav />
				<SearchBar />
			</div>
		);
	}
}

export default App;
