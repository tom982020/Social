/** @format */

import express from 'express';
import profileController from '../../controller/client/profile.controller';
import { checkToken } from '../../middleware/auth.middleware';

const profileRoute = express.Router();

profileRoute.use(checkToken);
profileRoute.post('/create', profileController.createProfile);
profileRoute.get('/:idAuthor', profileController.viewProfile);
profileRoute.put('/:id', profileController.updateProfile);

export = profileRoute;
