import dotenv from 'dotenv';

dotenv.config()


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/test';

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5050

const SATL = Number(process.env.satl) || 10;

const SECRET = process.env.SECRET_TOKEN || 'qWERTY@123';

const API_KEY= process.env.API_KEY
const API_SECRET=process.env.API_SECRET
const CLOUD_NAME= process.env.CLOUD_NAME

export const config ={
    mongo:{
        url: MONGODB_URL
    },
    server:{
        port: SERVER_PORT
    },
    satlRound:SATL,
    secret: SECRET,
    API_SECRET: API_SECRET,
    API_KEY: API_KEY,
    CLOUD_NAME: CLOUD_NAME
}