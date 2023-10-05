import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseApi from '../../api/baseApi';
const Login = ({ setLoggedIn, isLoggedIn }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);
		baseApi
			.post('/login', {
				email: email,
				password: password,
			})
			.then((response) => {
				localStorage.setItem('username', response.data.username);
				localStorage.setItem('email', response.data.email);
				localStorage.setItem('accessToken', response.data.accessToken);
				toast.success('Logged in successfully');
				navigate(`/home/${localStorage.getItem('username')}`, {
					replace: true,
				});
				setLoggedIn(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<form className="login" onSubmit={handleSubmit}>
				<h3>Login</h3>
				<label>Email:</label>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					autoComplete="new-password"
				/>
				<button>Log in </button>
				<h5>
					<Link to="/signup">dont have an account?</Link>
				</h5>
			</form>
		</div>
	);
};
export default Login;
