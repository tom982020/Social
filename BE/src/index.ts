/** @format */
'use strict';

import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
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
import bodyParser from 'body-parser';
import storiesRoute from './routes/client/stories.route';
import SpotifyWebApi from 'spotify-web-api-node';
import { resolve } from 'node:path/win32';
// import swaggerDocument from './swagger.json'

const swaggerDocument = require('./Doc/swagger-client.json');
require('./db');

dotenv.config();

const router = express();

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.ClientID,
	clientSecret: process.env.ClientSecret,
	redirectUri: 'http://localhost:8080/callback'
});

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
	router.use(express.urlencoded({ extended: false, limit: '100mb' }));
	// router.use(express.({ extended: false, limit: '100mb' }));
	router.use(express.json({ limit: '100mb' }));
	router.use(methodOverride('X-HTTP-Method')); //          Microsoft
	router.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
	router.use(methodOverride('X-Method-Override'));
	router.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
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
	const token = "BQCxydGyjAtgGh_lKsqySGNv4lzIisTwD9vwTOtBYQtUVwQTNTROuQtrKxdCvNrhNDskwjfF3RaiuWQr7b20dbfB-RlYkKepc7Tf-r1jf9VfuX8BbyMfAbgVg6F2CeweOwB2xlby9juceNw9F4Y9gGDvCqXLV9uKnLh2yUJ5tHIQXNiiUgmgedI-zcXbu04sxnEvw5lDXNtOPNOTeov2NUZPyo8MVcNMx8wzbgS8l4a6em2zWIJSEsFgIRY9vM3_Yd_P6rMK11tyZDckxZePWlb0ewO3M5KJVK0uU5bxTAkJ0_H6KpfbqZR6yMRZOg"

	spotifyApi.setAccessToken(token)

	// Routes
	router.use('/api-client-docs', swagger.serve, swagger.setup(swaggerDocument));
	router.use('/login', routerLogin);
	router.use('/authors', routerUser);
	router.use('/profile', routerProfile);
	router.use('/stories', storiesRoute);
	router.get('/', (req, res, next) => {
		res.redirect(spotifyApi.createAuthorizeURL([
			"ugc-image-upload",
			"user-read-playback-state",
			"app-remote-control",
			"user-modify-playback-state",
			"playlist-read-private",
			"user-follow-modify",
			"playlist-read-collaborative",
			"user-follow-read",
			"user-read-currently-playing",
			"user-read-playback-position",
			"user-library-modify",
			"playlist-modify-private",
			"playlist-modify-public",
			"user-read-email",
			"user-top-read",
			"streaming"
		], ""))
	})
	// router.get('/callback', (req, res, next) => {
	// 	console.log("req",req.query)
	// 	const code: any = req.query.code
	// 	// res.send(JSON.stringify(code))
	// 	spotifyApi.authorizationCodeGrant(code).then((response) => {
	// 		res.send(JSON.stringify(response))
	// 		// spotifyApi.setAccessToken(token)
	// 	})
	// })


	router.get('/ping', (req, res, next) =>
		res.status(200).json({ message: 'pong' })
	);
	router.get('/search', (req: any, res, next) => {
		spotifyApi.searchTracks(req.query.search)
			.then(function (data: any) {
				console.log('Search by "Love"', data.body);
				res.status(200).json({ data: data.body.tracks })
			}, function (err) {
				console.error(err);
			});
	})

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
