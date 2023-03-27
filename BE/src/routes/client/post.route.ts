import express from 'express';
import { checkToken } from '../../middleware/auth.middleware';
import postController from '../../controller/client/post.controller';

const postRoute = express.Router();

postRoute.use(checkToken);
postRoute.post('/create', postController.creatPost);
postRoute.post('/comment', postController.commentPost);
postRoute.get('/post-user', postController.getPostForUser);



export = postRoute;