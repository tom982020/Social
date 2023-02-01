/** @format */

import express from 'express';
import profileController from '../../controller/client/profile.controller';
import bodyParser from 'body-parser';
import { checkToken } from '../../middleware/auth.middleware';
import { profile } from 'console';

// const router = express();
// var r = bodyParser.urlencoded({ extended: false });

const profileRoute = express.Router();

// profileRoute.use(checkToken);
profileRoute.get('/:idAccount', profileController.getProfileAccount);
profileRoute.post('/create', profileController.createProfile);
profileRoute.get('/:idAuthor', profileController.viewProfile);
profileRoute.put('/:id', profileController.updateProfile);

export = profileRoute;
