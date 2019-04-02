import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
// import Login from '../components/Forms/Login';
import SignUp from '../components/NavBar/Forms/SignUp';
export default (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/profile" component={Profile} />
		<Route path="/signup" component={SignUp} />
		{/* <Route path="/" component={Login} /> */}
	</Switch>
);
