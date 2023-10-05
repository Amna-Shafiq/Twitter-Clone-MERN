import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../Navbar/Navbar.css';

const Header = styled(AppBar)`
	background: rgb(29, 63, 85);
`;
const Tab = styled(NavLink)`
	float: right;
	margin-right: 20px;
	font-size: 20px;
	color: inherit;
	text-decoration: none;
`;

const Navbar = (isLoggedIn) => {
	const auth = localStorage.getItem('username');
	return (
		<div>
			<Header position="fixed">
				<Toolbar>
					<Tab to="/home/:username">
						<img
							className="filter-blue"
							src={require('../images/twitter-bird-logo-svgrepo-com.svg')}
							alt="logo"
						/>
					</Tab>
					{auth ? (
						<Tab style={{ marginLeft: 950 }} to="/signup">
							Signout
						</Tab>
					) : (
						<>
							<Tab style={{ marginLeft: 1000 }} to="/signup">
								Signup
							</Tab>
							<Tab to="/login">Login</Tab>
						</>
					)}
				</Toolbar>
			</Header>
		</div>
	);
};

export default Navbar;
