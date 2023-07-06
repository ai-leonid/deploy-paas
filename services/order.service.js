import Order from '../models/order.model.js'
import * as ExcursionService from '../services/excursion.service.js'

export const findAll = async title => {
	const orders = await Order.find(title)

	return orders
}

export const findById = async id => {
	const order = await Order.findById(id)

	return order
}

export const createOrder = async ({
	excursion,
	firstName,
	lastName,
	phone,
	email,
}) => {
	await ExcursionService.findById(excursion)

	const order = await Order.create({
		excursion,
		firstName,
		lastName,
		phone,
		email,
	})

	return order
}
