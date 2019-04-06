import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/Landing/SearchBar/SearchBar';

import './App.css';
import MyRoutes from './config/routes';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/Profile/PageNotFound';

function MyRouters(props) {
	if (props.isLoggedIn) {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/profile" component={Profile} />
				{/* <Route path="*" component={PageNotFound} /> */}
			</div>
		);
	} else {
		return (
			<div>
				<Route exact path="/" component={Home} />

				{/* <Route from="*" path="*" component={PageNotFound} /> */}
			</div>
		);
	}
}
class App extends Component {
	state = {
		isLoggedIn: false
	};

	handleLogin = () => {
		this.setState({
			isLoggedIn: true
		});
	};

	handleLogout = () => {
		localStorage.clear();
		this.setState({
			isLoggedIn: false
		});
	};
	render() {
		return (
			<div className="App">
				<NavBar
					handleLogout={this.handleLogout}
					isLoggedIn={this.state.isLoggedIn}
					handleLogin={this.handleLogin}
				/>
				<Switch>
					<MyRouters isLoggedIn={this.state.isLoggedIn} />
				</Switch>
				<SearchBar />
			</div>
		);
	}
}

export default App;
