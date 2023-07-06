import AutoLoad from '@fastify/autoload'
import uploadFeature from '@adminjs/upload';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from '@fastify/cors'
import FastifySession from '@fastify/session'
// import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import AdminJSFastify from '@adminjs/fastify'
import AdminJS, { ComponentLoader } from 'adminjs'
import * as AdminJSMongoose from '@adminjs/mongoose'
import Excursion from './models/excursion.model.js';
import Order from './models/order.model.js';
import Comment from './models/comment.model.js';
import Upload from './models/upload.model.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const options = {}

const connectMongoOptions = {
	// keepAlive: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

AdminJS.registerAdapter({
	Resource: AdminJSMongoose.Resource,
	Database: AdminJSMongoose.Database,
})


const DEFAULT_ADMIN = {
	email: 'admin@example.com',
	password: '123456',
}
const authenticate = async (email, password) => {
	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
		return Promise.resolve(DEFAULT_ADMIN)
	}
	return null
}



export default async function (fastify, opts) {
	let mongooseDb = null;
	try {
		mongooseDb = await mongoose.connect(
			'mongodb+srv://admin:admin@allinone.d9ysbto.mongodb.net/xtomsk?retryWrites=true&w=majority',
			connectMongoOptions
		)
	} catch (e) {
		console.error(e)
	}

	// !!! admin JS
	const localProvider = {
		bucket: 'uploads/images',
		opts: {
			baseUrl: '/files',
		},
	};

	const componentLoader = new ComponentLoader()

	const files = {
		resource: Upload,
		/*options: {
			properties: {
				Key: {
					type: 'string',
				},
				bucket: {
					type: 'string',
				},
				mime: {
					type: 'string',
				},
				comment: {
					type: 'textarea',
					isSortable: false,
				},
			},
		},*/
		features: [
			uploadFeature({
				componentLoader,
				provider: { local: { bucket: 'uploads/images', opts: {} } },
				properties: { file: 'file', key: 'filename', bucket: 'bucket', mimeType: 'mime' },
				validation: { mimeTypes: ['image/png'] },
			}),
		],
	};

	// "secret" must be a string with at least 32 characters, example:
	const cookieSecret = 'sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5'
	const admin = new AdminJS({
		// databases: [mongooseDb],
		rootPath: '/admin',
		resources: [Excursion, Comment, Order/*, Upload*/, files],
	});

	const sessionStore =  MongoStore.create({
		client: mongoose.connection.getClient(),
		collectionName: 'sessions',
		stringify: false,
		autoRemove: 'interval',
		autoRemoveInterval: 1
	});

	// fastify.register(multipart);
	await AdminJSFastify.buildAuthenticatedRouter(
		admin,
		{
			authenticate,
			cookiePassword: cookieSecret,
			cookieName: 'adminjs',
		},
		fastify,
{
			store: sessionStore,
			saveUninitialized: true,
			secret: cookieSecret,
			cookie: {
				httpOnly: false, // process.env.NODE_ENV === 'production',
				secure: false, //process.env.NODE_ENV === 'production',
			},
		}
	)


	// OTHER
	await fastify.register(cors, {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH'],
	})

	// /user/mount/test/filename.jpg
	// c:\users\Username\filename.jpg
	fastify.register(fastifyStatic, {
		root: path.join(__dirname, 'uploads', 'images')
	});

	fastify.get('/uploads/images/:imageName', (req, reply) => {
		reply.sendFile(req.params.imageName)
	})

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts),
	})

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts),
	})
}
