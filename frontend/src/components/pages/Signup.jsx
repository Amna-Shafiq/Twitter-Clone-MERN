import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseApi from '../../api/baseApi';

const Signup = ({ setLoggedIn, isLoggedIn }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setName] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [dateofbirth, setDate] = useState('');
	const [is_admin, setAdmin] = useState('');
	const [image, setImage] = useState('');
	// const [url, setUrl] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		let res;
		if (image) {
			const data = new FormData();
			data.append('file', image);
			data.append('upload_preset', 'twitter-clone');
			data.append('cloud_name', 'dplttssxp');

			res = await axios.post(
				'https://api.cloudinary.com/v1_1/dplttssxp/image/upload',
				data
			);

			if (!res.data.url) return toast.error('image couldnt upload');
		}

		baseApi
			.post('/signup', {
				email: email,
				password: password,
				username: username,
				image: res && res.data.url,
				first_name: first_name,
				last_name: last_name,
			})
			.then((response) => {
				if (response.status === 200) {
					toast.success('Registered successfully');
					window.location.href = '/login'; // exp. http://localhost/signin.html
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error('Error occured');
			});
	};

	const logout = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('email');
		setLoggedIn(false);
		toast.success('logged out');
		window.location.href = '/login'; // exp. http://localhost/signin.html
	};

	return (
		<div style={{ marginTop: 50 }}>
			<>
				{!isLoggedIn ? (
					<>
						<form className="signup" onSubmit={handleSubmit}>
							<h3>Signup</h3>
							<label>Name:</label>
							<input
								type="text"
								onChange={(e) => setName(e.target.value)}
								value={username}
							/>
							<label>Email:</label>
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								autoComplete="off"
							/>
							<label>Password:</label>
							<input
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								autoComplete="new-password"
							/>
							<label>Date of birth:</label>
							<input
								type="Date"
								onChange={(e) => setDate(e.target.value)}
								value={dateofbirth}
								autoComplete="off"
							/>
							<label>First Name:</label>
							<input
								type="text"
								onChange={(e) => setFirstName(e.target.value)}
								value={first_name}
								autoComplete="off"
							/>
							<label>Last Name:</label>
							<input
								type="text"
								onChange={(e) => setLastName(e.target.value)}
								value={last_name}
								autoComplete="off"
							/>
							<label>Admin:</label>
							<input
								type="checkbox"
								onChange={(e) => setAdmin(e.target.value)}
								value={is_admin}
								autoComplete="off"
							/>
							<div className="file-field input-field">
								<div className="btn white blue darken-1">
									<span>Upload Profile Picture</span>
									<input
										type="file"
										required={false}
										onChange={(e) => {
											const image = e.target.files[0];
											if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
												console.log('select valid image.');
												toast.error('invalid image selected');
												return false;
											}
											setImage(e.target.files[0]);
										}}
									/>
								</div>
							</div>

							<button>Signup</button>
							<h5>
								<Link to="/login">already have an account?</Link>
							</h5>
						</form>
					</>
				) : (
					<>
						<h1>User is logged in</h1>
						<h2>Sure you want to logout?</h2>
						<button
							type="button"
							className="btn btn-info"
							style={{ color: 'white' }}
							onClickCapture={logout}
						>
							logout user
						</button>
					</>
				)}
			</>
		</div>
	);
};

export default Signup;
