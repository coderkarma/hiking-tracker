import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './NavBar.css';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import ProfileLogout from './ProfileLogout';
import LoginSignUp from './LoginSignUp';

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

function NavBar(props) {
	const { classes } = props;

	console.log(props.isLoggedIn);
	const NavButtons = props.isLoggedIn ? (
		<ProfileLogout handleLogout={props.handleLogout} />
	) : (
		<LoginSignUp handleLogin={props.handleLogin} {...props} />
	);
	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<i class="fas fa-hiking" />
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						<Link to="/" className="link">
							Hiking Tracker
						</Link>
					</Typography>
					{NavButtons}
				</Toolbar>
			</AppBar>
		</div>
	);
}
NavBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
// export default NavBar;
