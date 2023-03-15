/** @format */

import express from 'express';
import profileController from '../../controller/client/profile.controller';

const storiesRoute = express.Router();
storiesRoute.post('/create', profileController.createProfile);



export = storiesRoute;