import express from 'express';
import { checkToken } from '../../middleware/auth.middleware';
import postController from '../../controller/client/post.controller';

const postRoute = express.Router();

postRoute.get('/all', postController.getPostAll);
postRoute.use(checkToken);
postRoute.post('/create', postController.creatPost);
postRoute.post('/comment', postController.commentPost);
postRoute.get('/post-user', postController.getPostForUser);
postRoute.get('/comment-user/:idPost', postController.getComments);
postRoute.put('/update-heart/:postID', postController.heartPost)



export = postRoute;