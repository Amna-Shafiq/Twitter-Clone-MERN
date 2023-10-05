import React, { useState, useEffect } from 'react';

import baseApi from '../../api/baseApi';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserComments from './UserComments';

import './showTweets.css';

const ShowTweets = ({ user, refetch, setRefetch }) => {
	const [dataa, setData] = useState([]);
	const [editable, setEditable] = useState(false);

	useEffect(() => {
		baseApi.get('/tweets').then((res) => {
			setData(res.data.tweets);
		});
	}, [refetch]);

	const deleteTweet = (tweetID) => {
		baseApi.delete(`/tweets/${tweetID}`).then((result) => {
			toast.success('Tweet deleted successfully');

			setRefetch(!refetch);
		});
	};
	const likeTweet = async (id) => {
		await baseApi
			.put(`/tweets/like/${id}`)
			.then(() => {
				toast.success('Tweet liked successfully');
				setRefetch(!refetch);
			})
			.catch((err) => {
				console.log(err);
				toast.error('something went wrong');
			});
	};
	const unlikeTweet = (id) => {
		baseApi.put(`/tweets/unlike/${id}`).then(() => {
			toast.info('Tweet unliked successfully');
			setRefetch(!refetch);
		});
	};

	const updateTweet = (tweetID, content) => {
		baseApi
			.put(`/tweets/${tweetID}`, { content })
			.then(() => {
				toast.success('Tweet updated successfully');
				setRefetch(!refetch);
				setEditable(false);
			})
			.catch((err) => {
				console.log(err.response);
				alert('An error occurred! Try submitting the form again.');
			});
	};
	const ConvertToDate = (date) => {
		var datee = new Date(date);
		return datee.toString().slice(0, -42);
	};

	return (
		<div>
			<div style={{ marginTop: 10 }}>
				{dataa.map((item) => {
					return (
						<div key={item._id}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">
										{item.author.username ===
											localStorage.getItem('username') && (
											<i
												style={{
													color: 'red',
													cursor: 'pointer',
													justifyContent: 'flex-end',
													float: 'right',
												}}
												className="material-icons"
												onClick={() => deleteTweet(item._id)}
											>
												delete
											</i>
										)}

										<h5
											style={{
												float: 'left',

												padding: 5,
												paddingRight: 20,
											}}
										>
											{item.author.username}
										</h5>

										<div>
											<h6
												style={{
													fontSize: '10px',
													float: 'left',
													marginTop: 10,
												}}
												className="card-subtitle mb-2 text-muted"
											>
												{ConvertToDate(item.createdAt)}
											</h6>
										</div>
										<br />
									</h5>

									<div>
										{item.image[0] ? (
											<p className="card-image-top">
												<img
													className="img-thumbnail"
													style={{
														width: '390px',
														height: '400px',
														marginRight: 10,
													}}
													src={item.image[0]}
													alt="post"
												/>
											</p>
										) : null}
									</div>
									<br />
									<div>
										{editable ? (
											<form
												onSubmit={(e) =>
													updateTweet(item._id, e.target[0].value)
												}
											>
												<input type="text" defaultValue={item.content} />
											</form>
										) : (
											<>
												<p
													style={{ fontFamily: 'sans-serif' }}
													className="card-text"
												>
													{' '}
													{item.content}{' '}
												</p>

												<i
													className="card-title material-icons"
													style={{
														float: 'right',
														cursor: 'pointer',
														top: 200,
													}}
													onClick={() => setEditable(true)}
												>
													edit
												</i>
											</>
										)}
									</div>

									<p>
										{item.like.includes(user._id) ? (
											<i
												className="material-icons"
												onClick={() => unlikeTweet(item._id)}
												style={{
													color: 'red',
													cursor: 'pointer',
													float: 'left',
												}}
											>
												favorite
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() => likeTweet(item._id)}
												style={{
													cursor: 'pointer',
													float: 'left',
												}}
											>
												favorite_border
											</i>
										)}

										<h6>{item.like.length} likes</h6>
									</p>
									<br />

									<UserComments
										refetch={refetch}
										setRefetch={setRefetch}
										tweet={item}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default ShowTweets;
