import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { TweetModel as Tweet } from '../models/tweet_model.js';
import { CommentModel as Comment } from '../models/comments_model.js';
import { validateToken } from '../middleware/JWT.js';
import { UserModel as User } from '../models/user_model.js';
const app = express();
const router = express.Router();

router.get('', validateToken, async (req, res) => {
	Tweet.find({ author: req.user.id })
		.populate('author')
		.populate('comment')
		.populate('comment.author')
		.sort({ createdAt: -1 })
		.then((tweets) => {
			res.json({ tweets });
		});
});

//CREATE A TWEET
router.post('', validateToken, async (req, res) => {
	const { author, content, image } = req.body;
	if (!content) {
		return res.status(422).json({ error: 'please add content' });
	}

	// Create a new post

	const tweet = await Tweet.create({
		author: req.user.id,
		content,
		image,
	});

	await User.findByIdAndUpdate(
		tweet.author,
		{ $push: { tweets: tweet._id } },
		{ new: true, useFindAndModify: false }
	);
	// Save the post into the DB
	// await tweet.save();
	return res.status(201).json({
		statusCode: 201,
		message: 'Post created successfully',
		data: { tweet },
	});
});
router.delete('/:tweetID', validateToken, async (req, res) => {
	const tweet = await Tweet.findOne({ _id: req.params.tweetID });
	if (!tweet) return res.sendStatus(401);
	if (tweet.author.toString() !== req.user.id) return res.sendStatus(403);
	const deleteTweet = await Tweet.deleteOne({ _id: req.params.tweetID });
	res.sendStatus(200);
});
//update tweet

router.put('/:tweetID', validateToken, async (req, res) => {
	const tweet = await Tweet.findOne({ _id: req.params.tweetID });
	if (!tweet) return res.sendStatus(401);
	if (tweet.author.toString() !== req.user.id) return res.sendStatus(403);
	const newContent = req.body.content;
	if (!newContent) return res.sendStatus(400);
	const updatedTweet = await Tweet.findByIdAndUpdate(req.params.tweetID, {
		content: newContent,
	});
	res.json(updatedTweet);
});

router.put('/like/:tweetID', validateToken, async (req, res) => {
	const { tweetID } = req.params;

	const tweet = await Tweet.findOne({ _id: tweetID });

	if (!tweet) return res.send(403);

	if (tweet.like.includes(req.user.id)) return res.sendStatus(405);

	res.send(
		await Tweet.findByIdAndUpdate(
			tweetID,
			{ $push: { like: req.user.id } },
			{ new: true } //else mongodb will return some old record
		)
	);
});

router.put('/unlike/:tweetID', validateToken, async (req, res) => {
	const { tweetID } = req.params;
	const tweet = await Tweet.findOne({ _id: tweetID });

	if (!tweet) return res.send(403);
	if (!tweet.like.includes(req.user.id)) return res.sendStatus(405);

	res.send(
		await Tweet.findByIdAndUpdate(
			tweetID,
			{ $pull: { like: req.user.id } },
			{ new: true } //else mongodb will return some old record
		)
	);
});

router.post('/comment', validateToken, async (req, res) => {
	const { tweetID } = req.body;
	const tweet = await Tweet.findOne({ _id: tweetID });
	if (!tweet) return res.sendStatus(403);

	const content = req.body.content;
	if (!content) {
		return res.status(422).json({ error: 'please add content' });
	}
	const comment = await Comment.create({
		author: req.user.id,
		content: content,
	});
	await Tweet.findByIdAndUpdate(
		tweet._id,
		{ $push: { comment: comment._id } },
		{ new: true, useFindAndModify: false }
	);
	// await Tweet.findOne({ _id: tweetID }).populate('comment');

	return res.status(201).json({
		statusCode: 201,
		message: 'Comment created successfully',
		data: { comment },
	});
});

router.delete(
	'/comment/:tweetID/:commentID',
	validateToken,
	async (req, res) => {
		const tweet = await Tweet.findOne({ _id: req.params.tweetID });
		const comment = await Comment.findOne({ _id: req.params.commentID });

		if (!tweet || !comment) return res.sendStatus(401);
		if (comment.author.toString() !== req.user.id) return res.sendStatus(403);
		await Comment.deleteOne({ _id: req.params.commentID });
		res.sendStatus(200);
	}
);

router.get('/trending', validateToken, async (req, res) => {
	const sort = { likes: 1 };
	Tweet.find().then((tweets) => {
		res.json({ tweets });
	});
});

export default router;
