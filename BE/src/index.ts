/** @format */
'use strict';

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import routerUser from './routes/client/user.route';
import routerLogin from './routes/client/login.route';
import Logging from './library/Logging';
import { config } from './config/config';
import { checkToken } from './middleware/auth.middleware';
import routerProfile from './routes/client/profile.route';
import { CronJob } from './CronJob/cronJob';
import cors from 'cors';
import methodOverride from 'method-override';
import swagger from 'swagger-ui-express';
// import swaggerDocument from './swagger.json'

const swaggerDocument = require('./Doc/swagger-client.json');
require('./db');

dotenv.config();

const router = express();

const StartServer = () => {
	const cron = new CronJob();
	// cron.cronStories();
	router.use((req, res, next) => {
		Logging.info(
			`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
		);

		res.on('finish', () => {
			Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]
            - Status: [${req.statusCode}]`);
		});

		next();
	});
	const allowedOrigins = ['http://localhost:3000'];

	const options: cors.CorsOptions = {
		origin: allowedOrigins,
	};
	router.use(cors(options));
	// router.use(bodyParser.urlencoded({ extended: true }));
	// router.use(bodyParser.json());
	// router.use(bodyParser.);
	router.use(express.json({limit: '100mb'}));
	router.use(express.urlencoded({ extended: true, limit: '100mb' }));
	router.use(methodOverride('X-HTTP-Method')); //          Microsoft
	router.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
	router.use(methodOverride('X-Method-Override'));
	router.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);

		if (req.method == 'OPTIONS') {
			res.header(
				'Access-Control-Allow-Methods',
				'PUT, POST, PATCH, DELETE, GET'
			);
			return res.status(200).json({});
		}
		next();
	});
	router.use(methodOverride('_method'));

	// Routes
	router.use('/api-client-docs', swagger.serve, swagger.setup(swaggerDocument));
	router.use('/login', routerLogin);
	router.use('/authors', routerUser);
	router.use('/profile', routerProfile);

	router.get('/ping', (req, res, next) =>
		res.status(200).json({ message: 'pong' })
	);

	// Error handlers

	router.use((req, res, next) => {
		const error = new Error('Not found');
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	http
		.createServer(router)
		.listen(config.server.port, () =>
			Logging.info(`Server started on port ${config.server.port}`)
		);
};

StartServer();

// express()
//     .use(express.static(path.join(__dirname,'node_modules')))
//     .use(bodyParser.json())
//     .use(bodyParser.urlencoded({limit:'50mb',extended:true}))
//     .use(bodyParser.text())
//     .use(bodyParser.json({ type: 'application/json' }))
//     .get('/', (req:Request, res:Response) =>{
//         res.send('Hello, world!')
//     })
