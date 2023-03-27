/** @format */

import express from 'express';
import profileController from '../../controller/client/profile.controller';
import { checkToken } from '../../middleware/auth.middleware';

// const router = express();
// var r = bodyParser.urlencoded({ extended: false });

const profileRoute = express.Router();

profileRoute.use(checkToken);
profileRoute.post('/create', profileController.createProfile);
profileRoute.get('/:idAccount', profileController.getProfileAccount);
profileRoute.get('/view/:routeProfile', profileController.viewProfile);
profileRoute.put('/:id', profileController.updateProfile);
profileRoute.patch('/update-background/:id', profileController.updateProfileBackground);
profileRoute.patch('/add-friend', profileController.addFriendProfile);
profileRoute.patch('/accept-friend', profileController.acceptFriendProfile);
profileRoute.patch('/star-friend', profileController.rankProfile);
profileRoute.patch('/follow-friend', profileController.followProfile);
profileRoute.patch('/avatar-saved/:idProfile', profileController.updateAvatarSave);


export = profileRoute;
