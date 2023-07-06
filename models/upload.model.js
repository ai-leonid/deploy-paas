import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			required: [true, 'fileName is required field'],
		},
	},
	{
		timestamps: true,
	}
)

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload
