import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login';

const Main = () => {
	return (
		<div className="roww">
			<div className="columnn leftt "></div>
			<div className="columnn rightt ">
				<h4 style={{ textAlign: 'center' }}>Join Twitter Today</h4>
				<Link
					to="/signup"
					component={<Signup />}
					type="button"
					className="btn btn-primary "
					style={{ margin: '50px ' }}
				>
					Signup with email
				</Link>
				<h4 style={{ textAlign: 'center' }}>Already have an account?</h4>
				<Link
					type="button"
					className="btn btn-primary "
					style={{ margin: '50px ' }}
					to="/login"
					component={<Login />}
				>
					SignIn
				</Link>
			</div>
		</div>
	);
};

export default Main;
