import { UserModel as User } from '../models/user_model.js';
module.exports.UploadImage = async (req, res) => {
	const imageUploaded = new User({
		image: req.file.path,
	});
	try {
		await imageUploaded.save();
	} catch (error) {
		return res.status(400).json({
			message: 'image upload failed',
			status: 'error',
		});
	}
};
