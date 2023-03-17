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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import swaggerDocument from './swagger.json'
const swaggerDocument = require('./Doc/swagger-client.json');
require('./db');
dotenv_1.default.config();
const router = (0, express_1.default)();
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
    const allowedOrigins = ['*'];
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
    // Routes
    router.use('/api-client-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    router.use('/login', login_route_1.default);
    router.use('/authors', user_route_1.default);
    router.use('/profile', profile_route_1.default);
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
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
