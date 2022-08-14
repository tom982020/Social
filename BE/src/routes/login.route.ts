import express from 'express'
import controller from '../controller/Author'


const routerLogin = express.Router()


routerLogin.post('/', controller.loginAuthor)



export = routerLogin
