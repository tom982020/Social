import dotenv from 'dotenv';

dotenv.config()


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/test';

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5050

export const config ={
    mongo:{
        url: MONGODB_URL
    },
    server:{
        port: SERVER_PORT
    }
}