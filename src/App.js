import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/Landing/SearchBar/SearchBar';

import './App.css';
import MyRoutes from './config/routes';

class App extends Component {
	state = {
		isLoggedIn: false,
		user: ''
	};
	handleSignUp = user => {
		if (user) {
			this.setState({
				isLoggedIn: true,
				user: user
			});
		}
	};

	handleLogin = user => {
		if (user) {
			this.setState({
				isLoggedIn: true,
				user: user
			});
		}
	};
	render() {
		return (
			<div className="App">
				<NavBar
					handleSignUp={this.handleSignUp}
					isLoggedIn={this.state.isLoggedIn}
					handleLogin={this.handleLogin}
				/>
				{MyRoutes}
				<SearchBar />
			</div>
		);
	}
}

export default App;
