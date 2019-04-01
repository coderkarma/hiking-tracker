import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

function ButtonAppBar(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Hiking Tracker!!
					</Typography>
					<Button color="inherit">Login</Button>
					<Button color="inherit">SignUp</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
// import React, {
// 	Component
// } from 'react'

//  class NavBar extends Component {

// 	state = {
// 		email: '',
// 		password: '',
// 		isLoggedIn: ''
// 	};

// 	handleInput = (e) => {
// 		this.setState({
// 			[e.target.name]: e.target.value
// 		})
// 	}
// 	handleSignUp = e => {
// 		e.preventDefault();
// 		axios
// 			.post('localhost:3001/users/signup', {
// 				email: this.state.email,
// 				password: this.state.password
// 			})
// 			.then(response => {
// 				localStorage.token = response.data.signedJwt;

// 				this.setState({
// 					isLoggedIn: true,
// 					user: response.data.user
// 				});
// 			})
// 			.catch(err => console.log(err));
// 	};
// 	render() {
// 		return ( <
// 			div >

// 			<
// 			/div>
// 		)
// 	}
// }

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
// export default NavBar;
