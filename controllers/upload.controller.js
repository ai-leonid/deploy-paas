import * as uploadService from '../services/upload.service.js';

export const uploadImage = async (req, reply) => {
    try {
        const data = await req.body.uploadFile;
				console.log(data);

		const fileName = await uploadService.createUploadImage(data)

		return reply.code(200).send({fileName})
	} catch (error) {
		console.error(error)
		return reply.code(400).send({ status: 400, message: error.message })
	}
}
