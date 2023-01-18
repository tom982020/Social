"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const profile_controller_1 = __importDefault(require("../../controller/client/profile.controller"));
// const router = express();
// var r = bodyParser.urlencoded({ extended: false });
const profileRoute = express_1.default.Router();
// profileRoute.use(checkToken);
profileRoute.post('/create', profile_controller_1.default.createProfile);
profileRoute.get('/:idAuthor', profile_controller_1.default.viewProfile);
profileRoute.put('/:id', profile_controller_1.default.updateProfile);
module.exports = profileRoute;
