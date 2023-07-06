import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
	{
		nickName: {
			type: String,
			required: [true, 'Nickname is required field'],
		},
		message: {
			type: String,
			required: [true, 'Message is required field'],
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
