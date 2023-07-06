import {
	createOrder,
	getOrder,
	getOrders,
	removeOrder,
} from '../../controllers/order.controller.js'

export default async function (fastify, opts) {
	fastify.get('/', getOrders)

	fastify.get('/:id', getOrder)

	fastify.post('/', createOrder)

	fastify.delete('/:id', removeOrder)
}
