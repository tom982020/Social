/** @format */

import express from 'express';
import storiesController from '../../controller/client/stories.controller';
import { checkToken } from '../../middleware/auth.middleware';


const storiesRoute = express.Router();
storiesRoute.use(checkToken);
storiesRoute.post('/create-image', storiesController.createStoriesImage);
storiesRoute.post('/create-video', storiesController.createStoriesVideo);
storiesRoute.put('/update-video/:id', storiesController.updateStoriesVideo);
storiesRoute.put('/update-image/:id', storiesController.updateStoriesImage);
storiesRoute.put('/update-view/:id', storiesController.updateViewStory);



export = storiesRoute;