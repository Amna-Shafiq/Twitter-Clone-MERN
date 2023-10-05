import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FollowerSchema = new Schema(
	{
		user: {
			//its own id, refrencing the user schema
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		followee: [
			{
				//user that it follows
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},

	{ timestamps: true }
);
export const FollowerModel = mongoose.model('follower', FollowerSchema);
