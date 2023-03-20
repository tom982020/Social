"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const stories_controller_1 = __importDefault(require("../../controller/client/stories.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const storiesRoute = express_1.default.Router();
storiesRoute.use(auth_middleware_1.checkToken);
// storiesRoute.get('/search', storiesController.getSpotify);
storiesRoute.post('/create-image', stories_controller_1.default.createStoriesImage);
storiesRoute.post('/create-video', stories_controller_1.default.createStoriesVideo);
storiesRoute.put('/update-video/:id', stories_controller_1.default.updateStoriesVideo);
storiesRoute.put('/update-image/:id', stories_controller_1.default.updateStoriesImage);
storiesRoute.put('/update-view/:id', stories_controller_1.default.updateViewStory);
module.exports = storiesRoute;
