export default async function (fastify, opts) {
	fastify.get('/', async function (request, reply) {
		return reply.code(200).send({ root: true })
	})
}
