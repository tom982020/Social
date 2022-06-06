import express from 'express'
import controller from '../controller/Author'

const routerUser = express.Router()

routerUser.get('/', controller.readAllAuthor)
routerUser.get('/:authorId', controller.readAuthor)
routerUser.post('/create', controller.createAuthor)
routerUser.put('/update/:authorId', controller.updateAuthor)
routerUser.delete('/delete/:authorId', controller.deleteAuthor)


export = routerUser