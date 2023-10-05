import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateTweet from './CreateTweet';
import ShowTweets from './showTweets';
import baseApi from '../../api/baseApi';
import LeftSideBar from './LeftSideBar';
import './Home.css';
import RightSideBar from './RightSideBar';

const Homepage = () => {
	const [data, setData] = useState('');
	const [image, setImage] = useState('');
	const [refetch, setRefetch] = useState(true);

	useEffect(() => {
		baseApi.get('/user').then((res) => {
			setData(res.data);
			setImage(res.data.image);
		});
	}, []);

	if (!data) return null;
	return (
		<>
			<div style={{ marginTop: 50 }} className="row">
				<div className="column left">
					<LeftSideBar  />
				</div>
				<div className="column middle">
					<div className=" justify-content-center align-items-center ">
						<div className="col  ">
							<div className="card">
								<div
									className="rounded-top text-white d-flex "
									style={{ backgroundColor: 'DimGray', height: 200 }} ////
								>
									<div
										className="ms-4 mt-5 d-flex flex-column"
										style={{ width: 150 }}
									>
										{image[0] !== '' ? (
											<img
												src={image}
												alt="Generic placeholder "
												className="img-fluid img-thumbnail "
												style={{ width: 150, height: 150, marginLeft: 1 }}
											/>
										) : (
											<img
												src={require('../images/c0789cbe164309fefbddf0d1f0ea1d88.jpeg')}
												alt="Generic placeholder "
												className="img-fluid img-thumbnail "
												style={{ width: 150, height: 150, marginLeft: 1 }}
											/>
										)}

										<Link
											type="button"
											className="btn btn-primary btn"
											style={{ 'z-index': 0, marginTop: 35 }}
											to="/editProfile"
										>
											Edit profile
										</Link>
									</div>
									<div className="ms-3" style={{ 'margin-top': 130 }}>
										<h5>{data.username}</h5>
										<p>
											{' '}
											{data.first_name} {data.last_name}
										</p>
									</div>
								</div>
								<div
									className="p-4 text-black"
									style={{ backgroundColor: ' #f8f9fa' }}
								>
									<div className="d-flex justify-content-end text-center py-1">
										<div>
											<p className="mb-1 h5">{data.tweets.length}</p>
											<p className="small text-muted mb-0">Tweets</p>
										</div>
										<div className="px-3">
											<p className="mb-1 h5">0</p>
											<p className="small text-muted mb-0">Followers</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<body style={{ marginTop: 10 }}>
						<CreateTweet setRefetch={setRefetch} />
						<ShowTweets refetch={refetch} setRefetch={setRefetch} user={data} />
					</body>
				</div>
				<div  className="column right">
					<RightSideBar />
				</div>
			</div>
		</>
	);
};
export default Homepage;
