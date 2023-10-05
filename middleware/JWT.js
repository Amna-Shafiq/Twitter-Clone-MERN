import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
app.use(cookieParser());
dotenv.config();

const createTokens = (user) => {
	const accessToken = sign(
		{
			username: user?.username,
			id: user?.id,
		},
		process.env.SECRET_KEY
	);
	return accessToken;
};

const validateToken = (req, res, next) => {
	const authheader = req.headers['access-token'] || req.cookies['access-token'];
	if (authheader) {
		jwt.verify(authheader, process.env.SECRET_KEY, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			if (user.username !== req.headers.username) return res.sendStatus(403);

			next();
		});
	} else {
		console.log(user);
		res.sendStatus(401);
	}
};
export { createTokens, validateToken };
