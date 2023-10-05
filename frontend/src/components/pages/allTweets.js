import React, { useState, useEffect } from 'react';

import baseApi from '../../api/baseApi';
import './AllTweets.css';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTweets = () => {
	const [data, setData] = useState([]);
	const [refetch, setRefetch] = useState(true);

	useEffect(() => {
		baseApi
			.get('/alltweets')
			.then((res) => {
				setData(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
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
	const ConvertToDate = (date) => {
		var datee = new Date(date);
		return datee.toString().slice(4, -42);
	};

	return (
		<div style={{ marginTop: 100 }}>

			<div className="column right">
				<RightSideBar />
			</div>
			<div className="column middle">
				{data.map((user) => (
					<div key={user._id}>
						{user.tweets.map((tweets) => (
							<section className="card tweets">
								<div className="frow">
									<div className="user ">
										{user.image[0] ? (
											<img src={user.image[0]} alt="post" />
										) : (
											<img
												src={require('../images/c0789cbe164309fefbddf0d1f0ea1d88.jpeg')}
												alt="Generic placeholder "
											></img>
										)}
									</div>
									<div className="tweet-header-text">
										<h6 style={{ marginLeft: 10, fontWeight: 'bolder' }}>
											@{user.username}
											<span
												style={{
													marginLeft: 25,
													fontSize: 'small',
													color: 'grey',
												}}
											>
												{ConvertToDate(tweets.createdAt)}
											</span>
										</h6>
									</div>
								</div>

								<p style={{ marginLeft: 160 }}>{tweets.content}</p>
								<div className="col-md-4">
									{tweets.image[0] ? (
										<img
											style={{
												marginLeft: 160,
												marginBottom: 10,
												borderRadius: 10,
												border: '0.5px solid',
											}}
											className="img-responsive img-resize"
											src={tweets.image[0]}
											alt="post"
										/>
									) : null}


								</div>

								<div>
								{tweets.like.includes(user._id) ? (
											<i
												className="material-icons"
												onClick={() => unlikeTweet(tweets._id)}
												style={{
													color: 'red',
													cursor: 'pointer',
													float: 'left',
													marginLeft: 10,
												}}
											>
												favorite
											</i>
										) : (
											<i
												className="material-icons"
												onClick={() => likeTweet(tweets._id)}
												style={{
													cursor: 'pointer',
													float: 'left',
													marginLeft: 10,
												}}
											>
												favorite_border
											</i>
										)}


										<h6>{tweets.like.length} likes</h6>

									<br />
									</div>

							</section>
						))}
					</div>
				))}
			</div>

			<div className="column left">
				<LeftSideBar/>
			</div>
		</div>
	);
};

export default AllTweets;
