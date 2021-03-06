import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import http from "http";
import routerUser from './routes/user.route'
import Logging from './library/Logging';
import { config } from './config/config';
require('./db')

dotenv.config();

const router = express();

const StartServer = () =>{
    router.use((req, res, next) =>{
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () =>{
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]
            - Status: [${req.statusCode}]`)
        })

        next()
    })

    router.use(express.urlencoded({extended:true}))
    router.use(express.json())

    router.use((req, res, next) =>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next()
    })

    // Routes

    router.use('/authors', routerUser)


    router.get('/ping', (req,res,next) => res.status(200).json({message: 'pong'}))


    // Error handlers

    router.use((req, res, next) =>{
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({message: error.message})
    })

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server started on port ${config.server.port}`))
}

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
    