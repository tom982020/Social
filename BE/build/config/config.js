"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/test';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5050;
const SATL = Number(process.env.satl) || 10;
const SECRET = process.env.SECRET_TOKEN || 'qWERTY@123';
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;
exports.config = {
    mongo: {
        url: MONGODB_URL
    },
    server: {
        port: SERVER_PORT
    },
    satlRound: SATL,
    secret: SECRET,
    API_SECRET: API_SECRET,
    API_KEY: API_KEY,
    CLOUD_NAME: CLOUD_NAME
};
