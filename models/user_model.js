import mongoose from 'mongoose';

const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	dateofbirth: {
		type: Date,
	},
	is_admin: {
		type: Boolean,
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	image: [{ type: String }],

	tweets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tweet',
		},
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'comment',
		},
	],

	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'follower',
		},
	],
});

UserSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

// UserSchema.methods.isValidPassword = async function (password) {
// 	const user = this;
// 	const compare = await bcrypt.compare(password, user.password);

// 	return compare;
// };

export const UserModel = mongoose.model('user', UserSchema);

// module.exports = UserModel;
