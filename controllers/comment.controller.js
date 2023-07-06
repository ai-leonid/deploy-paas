import Comment from '../models/comment.model.js'
import * as ServiceComment from '../services/comment.service.js'

export const getComments = async (req, reply) => {
	try {
		const { query } = req

		const comments = await ServiceComment.findAll({ title: query?.title })

		return reply.code(200).send(comments)
	} catch (error) {
		console.error(error)
		return reply.code(404).send({ status: 404, message: 'entity not found' })
	}
}

export const postComment = async (req, reply) => {
	try {
		const { excursionId } = req.params
		const { nickName, message, image } = req.body
		const comment = ServiceComment.createComment({
			excursionId,
			nickName,
			message,
			image,
		})

		return comment
	} catch (error) {
		console.error(error)
		return reply.code(404).send(error)
	}
}

export const removeComment = async (req, reply) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.id)

		return comment
	} catch (error) {
		console.error(error)
		return reply.code(404).send({ status: 404, message: 'entity not found' })
	}
}
