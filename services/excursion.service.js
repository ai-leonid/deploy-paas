import Excursion from '../models/excursion.model.js'

export const findAll = async ({ title, theme, date }) => {
	const filter = {}

	if (title) {
		filter.title = title
	}
	if (theme) {
		filter.theme = theme
	}
	if (date) {
		filter.date = {
			//greater that equal >=
			//2023-05-31 - сработает
			//31.05.2023 - НЕ сработает
			$gte: new Date(date),
		}
	}

	const excursions = await Excursion.find(filter).populate([{
          path: 'comments',
          model: 'Comment',
        }])

	return excursions
}

export const findById = async (id) => {
	const existedExcursion = await Excursion.findById(id).populate([{
		path: 'comments',
		model: 'Comment',
	  }])

	if (!existedExcursion) {
		throw new Error('Excursion does not exist!')
	}

	return existedExcursion
}

export const rateExcursionById = async (id, rating) => {

	await findById(id);

	const existedExcursion = await Excursion.findOneAndUpdate(
		{ _id: id },
		{ $push: { rating }},
		{
			new: true
		}
	)

	return existedExcursion
}

export const getExcursionRatingById = async (id) => {
	const { rating } = await findById(id);

	let average = 0;
	if (rating.length > 0) {
		average = rating.reduce((a, b) => a + b, 0) / rating.length;
	}

	return {
		average,
		rating,
	}
}

export const attachComment = async (commentId, excursionId) => {

	const excursion = await Excursion.updateOne(
		{ _id: excursionId },
		{ $push: { comments: commentId } }
	)

	return excursion
}
