import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
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
		images: [
			{
				type: String,
			},
		],
	},

	{ timestamps: true }
);
export const CommentModel = mongoose.model('comment', CommentSchema);
