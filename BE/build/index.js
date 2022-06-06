"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const Logging_1 = __importDefault(require("./library/Logging"));
const config_1 = require("./config/config");
require('./db');
dotenv_1.default.config();
const router = (0, express_1.default)();
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]
            - Status: [${req.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // Routes
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    // Error handlers
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server started on port ${config_1.config.server.port}`));
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
