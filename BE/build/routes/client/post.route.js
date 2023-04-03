"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const post_controller_1 = __importDefault(require("../../controller/client/post.controller"));
const postRoute = express_1.default.Router();
postRoute.use(auth_middleware_1.checkToken);
postRoute.post('/create', post_controller_1.default.creatPost);
postRoute.post('/comment', post_controller_1.default.commentPost);
postRoute.get('/post-user', post_controller_1.default.getPostForUser);
postRoute.get('/comment-user', post_controller_1.default.getComments);
postRoute.get('/all', post_controller_1.default.getPostAll);
postRoute.put('/update-heart/:postID', post_controller_1.default.heartPost);
module.exports = postRoute;
