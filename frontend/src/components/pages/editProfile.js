import React, { useState, useEffect } from 'react';
import baseApi from '../../api/baseApi';
import { toast } from 'react-toastify';

const EditProfile = () => {
	const [data, setData] = useState();
	// const [image, setImage] = useState('');

	useEffect(() => {
		baseApi.get('/user').then((res) => {
			setData(res.data);
		});
	}, []);

	const formHandler = (e) => {
		e.preventDefault();

		baseApi
			.put('/edit', {
				id: data._id,

				email: e.target.email.value,

				last_name: e.target.lastName.value,
				first_name: e.target.firstName.value,
				dateofbirth: e.target.dateOfBirth.value,
			})
			.then((response) => {
				toast.success('Profile updated successfully');
				localStorage.setItem('username', response.data.username);
				localStorage.setItem('email', response.data.email);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (!data) return null;

	return (
		<div style={{ marginTop: 50 }}>
			<h3>Edit Profile</h3>
			<form onSubmit={(e) => formHandler(e)}>
				{/* <label>Name:</label>
				<input
					name="username"
					type="text"
					defaultValue={data.username}
					autoComplete="off"
				/> */}

				<label>Email:</label>
				<input
					name="email"
					type="email"
					defaultValue={data.email}
					autoComplete="off"
				/>

				<label>First Name:</label>
				<input
					name="firstName"
					type="text"
					defaultValue={data.first_name}
					autoComplete="off"
				/>
				<label>Last Name:</label>
				<input
					name="lastName"
					type="text"
					defaultValue={data.last_name}
					autoComplete="off"
				/>
				<label>Date of birth:</label>
				<input name="dateOfBirth" type="Date" defaultValue={data.dateofbirth} />

				{/* <div className="file-field input-field">
							<div className="btn white blue darken-1">
								<span>Upload Profile Picture</span>
								<input
									type="file"
									required={false}
									value={data.image}
									onChange={(e) => setImage(e.target.files[0])}
								/>
							</div>
						</div> */}
				<button>Update</button>
			</form>
		</div>
	);
};

export default EditProfile;
