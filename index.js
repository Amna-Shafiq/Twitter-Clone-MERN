import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// import { TweetModel as Tweet } from './models/tweet_model.js';

import { UserModel as User } from './models/user_model.js';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import routes from './routes/tweet.js';
import { createTokens, validateToken } from './middleware/JWT.js';
import router from './routes/tweet.js';
// import { router as userRoutes } from './routes/user.js';
const app = express();
dotenv.config();
app.use(express.json()); //app.use creates a middleware, express.json so we can accept json as body request
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	// app.use('/api', ImageUploadRouter);
	console.log(`The server has started on port: ${PORT}`);
	mongoose
		.connect(process.env.MONGODB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('MongoDB connection established.'))
		.catch((error) =>
			console.error('MongoDB connection failed:', error.message)
		);

	app.post('/signup', (req, res) => {
		const { username, password, email, image, first_name, last_name } =
			req.body;
		bcrypt.hash(password, 10).then((hash) => {
			const user = User.create({
				username: username,
				password: hash,
				email: email,
				image: image,
				first_name: first_name,
				last_name: last_name,
			})
				.then(() => {
					console.log(user);
					res.json('USER REGISTERED');
				})
				.catch((err) => {
					if (err) {
						res.status(400).json({ error: err });
					}
				});
		});
	});

	app.get('/status', (req, res) => {
		res.sendStatus(200);
	});

	app.post('/login', async (req, res) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (!user) res.status(400).json({ error: "User Doesn't Exist" });

		const dbPassword = user?.password;
		const entered_pass = bcrypt.hash(password, 10);
		if (entered_pass === dbPassword) {
			res.status(400).json({ error: 'Wrong email and Password Combination!' });
		} else {
			const accessToken = createTokens(user);

			res.cookie('access-token', accessToken, {
				maxAge: 60 * 60 * 24 * 30 * 1000,
				httpOnly: true,
			});

			res.json({
				username: user?.username,
				email: user?.email,
				accessToken: accessToken,
			});
		}
	});

	app.get('/tweets/:username', validateToken, async (req, res) => {
		const { username } = req.params;

		const user = await User.findOne({ username: username }).populate('tweets');

		res.json(user);
	});

	app.get('/user', validateToken, async (req, res) => {
		const user = await User.findOne({ username: req.user.username }).populate(
			'tweets'
		);
		res.json(user);
	});

	//fetch all tweets
	app.get('/alltweets', validateToken, async (req, res) => {
		const user = await User.find().populate('tweets');
		console.log('hellojeeeeee', user);
		res.json(user);
	});

	//edit profile
	app.put('/edit', validateToken, async (req, res) => {
		const user = await User.findOne({ _id: req.body.id });
		console.log(user);

		if (!user) return res.sendStatus(401);

		// if (user._id.toString() !== req.body.id) return res.sendStatus(403);

		const updatedProfile = await User.findByIdAndUpdate(req.body.id, {
			username: req.body.username,
			dateofbirth: req.body.dateofbirth,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
		});
		res.json(updatedProfile);
	});

	app.use('/tweets', router);
});
