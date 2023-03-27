/** @format */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const user_route_1 = __importDefault(require("./routes/client/user.route"));
const login_route_1 = __importDefault(require("./routes/client/login.route"));
const Logging_1 = __importDefault(require("./library/Logging"));
const config_1 = require("./config/config");
const profile_route_1 = __importDefault(require("./routes/client/profile.route"));
const cronJob_1 = require("./CronJob/cronJob");
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const stories_route_1 = __importDefault(require("./routes/client/stories.route"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const post_route_1 = __importDefault(require("./routes/client/post.route"));
// import swaggerDocument from './swagger.json'
// const swaggerDocument = require('./Doc/swagger-client.json');
require('./db');
dotenv_1.default.config();
const router = (0, express_1.default)();
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    redirectUri: 'http://localhost:8080/callback',
});
const StartServer = () => {
    const cron = new cronJob_1.CronJob();
    // cron.cronStories();
    router.use((req, res, next) => {
        Logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]
            - Status: [${req.statusCode}]`);
        });
        next();
    });
    const allowedOrigins = ['http://localhost:3000'];
    const options = {
        origin: allowedOrigins,
    };
    router.use((0, cors_1.default)(options));
    // router.use(bodyParser.urlencoded({ extended: true }));
    // router.use(bodyParser.json());
    // router.use(bodyParser.);
    router.use(express_1.default.urlencoded({ extended: false, limit: '100mb' }));
    // router.use(express.({ extended: false, limit: '100mb' }));
    router.use(express_1.default.json({ limit: '100mb' }));
    router.use((0, method_override_1.default)('X-HTTP-Method')); //          Microsoft
    router.use((0, method_override_1.default)('X-HTTP-Method-Override')); // Google/GData
    router.use((0, method_override_1.default)('X-Method-Override'));
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    router.use((0, method_override_1.default)('_method'));
    const token = 'BQCxydGyjAtgGh_lKsqySGNv4lzIisTwD9vwTOtBYQtUVwQTNTROuQtrKxdCvNrhNDskwjfF3RaiuWQr7b20dbfB-RlYkKepc7Tf-r1jf9VfuX8BbyMfAbgVg6F2CeweOwB2xlby9juceNw9F4Y9gGDvCqXLV9uKnLh2yUJ5tHIQXNiiUgmgedI-zcXbu04sxnEvw5lDXNtOPNOTeov2NUZPyo8MVcNMx8wzbgS8l4a6em2zWIJSEsFgIRY9vM3_Yd_P6rMK11tyZDckxZePWlb0ewO3M5KJVK0uU5bxTAkJ0_H6KpfbqZR6yMRZOg';
    spotifyApi.setAccessToken(token);
    // Routes
    // router.use('/api-client-docs', swagger.serve, swagger.setup(swaggerDocument));
    router.use('/login', login_route_1.default);
    router.use('/authors', user_route_1.default);
    router.use('/profile', profile_route_1.default);
    router.use('/stories', stories_route_1.default);
    router.use('/post', post_route_1.default);
    router.get('/', (req, res, next) => {
        res.redirect(spotifyApi.createAuthorizeURL([
            'ugc-image-upload',
            'user-read-playback-state',
            'app-remote-control',
            'user-modify-playback-state',
            'playlist-read-private',
            'user-follow-modify',
            'playlist-read-collaborative',
            'user-follow-read',
            'user-read-currently-playing',
            'user-read-playback-position',
            'user-library-modify',
            'playlist-modify-private',
            'playlist-modify-public',
            'user-read-email',
            'user-top-read',
            'streaming',
        ], ''));
    });
    // router.get('/callback', (req, res, next) => {
    // 	console.log("req",req.query)
    // 	const code: any = req.query.code
    // 	// res.send(JSON.stringify(code))
    // 	spotifyApi.authorizationCodeGrant(code).then((response) => {
    // 		res.send(JSON.stringify(response))
    // 		// spotifyApi.setAccessToken(token)
    // 	})
    // })
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    router.get('/search', (req, res, next) => {
        spotifyApi.searchTracks(req.query.search).then(function (data) {
            console.log('Search by "Love"', data.body);
            res.status(200).json({ data: data.body.tracks });
        }, function (err) {
            console.error(err);
        });
    });
    // Error handlers
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => Logging_1.default.info(`Server started on port ${config_1.config.server.port}`));
};
StartServer();
