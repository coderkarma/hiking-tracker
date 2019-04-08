import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
// import SearchBar from './components/Landing/SearchBar/SearchBar';

import './App.css';
// import MyRoutes from './config/routes';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import axios from 'axios';
// import PageNotFound from './components/Profile/PageNotFound';

function MyRouters(props) {
	console.log('router', props);
	if (props.isLoggedIn) {
		return (
			<Switch>
				<Route exact path="/" render={() => <Home user={props.user} refreshUser={props.refreshUser} />} />
				<Route path="/profile" render={() => <Profile user={props.user} refreshUser={props.refreshUser} />} />

				{/* <Route path="*" component={PageNotFound} />  */}
			</Switch>
		);
	} else {
		return (
			<Switch>
				<Redirect from="/profile" to="/" />
				<Route exact path="/" render={() => <Home user={props.user} refreshUser={props.refreshUser} />} />
			</Switch>
		);
	}
}
class App extends Component {
	state = {
		isLoggedIn: false,
		loadingUser: true,
		user: null
	};

	componentDidMount() {
		this.refreshUser();
	}
	handleLogin = user => {
		console.log(this.props);
		this.setState(
			{
				isLoggedIn: true,
				user
			},
			() => {
				this.props.history.push('/profile');
			}
		);
	};

	refreshUser = () => {
		const token = localStorage.getItem('token');
		if (!token) {
			this.setState({
				user: null,
				loadingUser: false
			});
			return;
		}
		axios
			.get('http://localhost:3001/users/profile', {
				headers: {
					'x-token': token
				}
			})
			.then(res => {
				console.log(res);
				this.setState({ user: res.data, loadingUser: false, isLoggedIn: true });
			})
			.catch(() => {
				this.handleLogout();
			});
	};

	handleLogout = () => {
		localStorage.clear();
		this.setState(
			{
				isLoggedIn: false,
				user: null,
				loadingUser: false
			},
			() => {
				this.props.history.push('/');
			}
		);
	};

	render() {
		if (this.state.loadingUser) {
			return null;
		}
		return (
			<div className="App">
				<NavBar
					handleLogout={this.handleLogout}
					isLoggedIn={this.state.isLoggedIn}
					handleLogin={this.handleLogin}
				/>

				<MyRouters isLoggedIn={this.state.isLoggedIn} user={this.state.user} refreshUser={this.refreshUser} />
				{/* <Route path="*" component={PageNotFound} /> */}
			</div>
		);
	}
}

export default withRouter(App);
