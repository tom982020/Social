"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const profile_controller_1 = __importDefault(require("../../controller/client/profile.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
// const router = express();
// var r = bodyParser.urlencoded({ extended: false });
const profileRoute = express_1.default.Router();
profileRoute.use(auth_middleware_1.checkToken);
profileRoute.get('/:idAccount', profile_controller_1.default.getProfileAccount);
profileRoute.get('/view/:idAuthor', profile_controller_1.default.viewProfile);
profileRoute.post('/create', profile_controller_1.default.createProfile);
profileRoute.put('/:id', profile_controller_1.default.updateProfile);
profileRoute.put('/update-background/:id', profile_controller_1.default.updateProfileBackground);
module.exports = profileRoute;
