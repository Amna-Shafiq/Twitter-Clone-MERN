import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TweetSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		image: [
			{
				type: String,
			},
		],
		like: [{ type: Schema.Types.ObjectID, ref: 'user' }],
		comment: [{ type: Schema.Types.ObjectID, ref: 'comment' }],
	},
	{ timestamps: true }
);
export const TweetModel = mongoose.model('tweet', TweetSchema);
