import Comment from '../models/comment.model.js'
import * as ExcursionService from '../services/excursion.service.js'

export const findAll = async ({ nickName }) => {
	const comments = await Comment.find({ nickName })

	return comments
}

export const createComment = async ({
	excursionId,
	nickName,
	message,
	image,
}) => {
	const excursion = await ExcursionService.findById(excursionId)

	const comment = await Comment.create({
		nickName: nickName || null,
		message: message || null,
		image: image || null,
	})

	ExcursionService.attachComment(comment._id, excursion._id)

	return comment
}
