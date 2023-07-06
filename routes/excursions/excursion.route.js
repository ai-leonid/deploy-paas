import {
	createExcursion,
	rateExcursion,
	getExcursionRating,
	getExcursion,
	getExcursions,
	removeExcursion,
} from '../../controllers/excursion.controller.js'

// export const ExcursionJsonScheme = {
//   type: 'object',
//   properties: {
//     _id: { type: 'string' },
//     title: { type: 'string' },
//   },
// };

// const getExcursionsOpts = {
//   schema: {
//     response: {
//       200: {
// type: 'array',
// // items: ExcursionJsonScheme,
//   }
//     },
//   },
//   handler: getExcursions,
// };

export default async function (fastify, opts) {
	fastify.get('/', getExcursions)

	fastify.get('/:id', getExcursion)

	fastify.post('/', createExcursion)

	fastify.post('/:id/rating', rateExcursion)

	fastify.get('/:id/rating', getExcursionRating)

	fastify.delete('/:id', removeExcursion)
}
