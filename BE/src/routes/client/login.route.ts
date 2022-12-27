/** @format */

import express from 'express';
import controller from '../../controller/client/author.controller';

const routerLogin = express.Router();

routerLogin.post('/', controller.loginAuthor);

export = routerLogin;
