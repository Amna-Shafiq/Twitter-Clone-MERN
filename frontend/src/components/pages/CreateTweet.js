import React, { useState } from 'react';
import axios from 'axios';
import './CreateTweet.css';
import baseApi from '../../api/baseApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateTweet = ({ setRefetch }) => {
	const [content, setContent] = useState('');
	const [image, setImage] = useState('');

	const handleSubmit = async (e) => {
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
		if (!content) {
			toast.error('Add content');
		}
		baseApi
			.post('/tweets', {
				content: content,
				image: res && res.data.url,
			})
			.then(() => {
				toast.success('Tweet created successfully');
				setRefetch((prevState) => !prevState);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					handleSubmit(e);
				}}
			>
				<input
					className="text-area"
					type="text"
					placeholder="Whats Happening?"
					onChange={(e) => setContent(e.target.value)}
					value={content}
				/>
				<div className="image-upload">
					<label for="file-input">
						<i style={{ cursor: 'pointer' }} className="material-icons">
							attachment
						</i>
					</label>

					<input
						id="file-input"
						type="file"
						accept="image/*"
						onChange={(e) => {
							setImage(e.target.files[0]);
						}}
					/>
				</div>
				{/* </div> */}
				<button>Tweet</button>
			</form>
		</div>
	);
};

export default CreateTweet;
