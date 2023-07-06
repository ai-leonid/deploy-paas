import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		excursion: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Excursion',
			required: [true, 'Excursion ID is required'],
		},
		firstName: {
			type: String,
			required: [true, 'Name is required field'],
		},
		lastName: {
			type: String,
			required: [true, 'Surname is required field'],
		},
		phone: {
			type: String,
			required: [true, 'Phone is required field'],
		},
		email: {
			type: String,
			required: [true, 'Email is required field'],
		},
	},
	{
		timestamps: true,
	}
)

const Order = mongoose.model('Order', orderSchema)
export default Order
