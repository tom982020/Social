/** @format */

import express from 'express';
import controller from '../../controller/client/author.controller';
import { checkToken } from '../../middleware/auth.middleware';

const routerUser = express.Router();
routerUser.post('/create', controller.createAuthor);
// routerUser.use(checkToken);
routerUser.get('/', controller.readAllAuthor);
routerUser.get('/checktoken/:authorId', controller.testJWT);
routerUser.get('/:authorId', controller.readAuthor);
routerUser.put('/update/:authorId', controller.updateAuthor);
routerUser.delete('/delete/:authorId', controller.deleteAuthor);

export = routerUser;
