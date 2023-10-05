import axios from 'axios';

// console.log(localStorage.getItem('accessToken'));
// const baseApi = () =>
// 	axios.create({
// 		baseURL: 'http://localhost:5000',

// 		// baseURL: process.env.REACT_APP_API_URL,
// 		headers: {
// 			'access-token': localStorage.getItem('accessToken'),
// 			username: localStorage.getItem('username'),
// 		},
// 	});

const defaultHeader = (config) => {
	config.headers['access-token'] = localStorage.getItem('accessToken') || '';
	config.headers['username'] = localStorage.getItem('username') || '';
};

const baseApi = () => {
	const defaultOptions = {
		baseURL: 'http://localhost:5000',
	};
	const instance = axios.create(defaultOptions);

	instance.interceptors.request.use(
		(config) => {
			defaultHeader(config);
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);

	return instance;
};

export default baseApi();
