"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const profile_controller_1 = __importDefault(require("../../controller/client/profile.controller"));
const storiesRoute = express_1.default.Router();
storiesRoute.post('/create', profile_controller_1.default.createProfile);
module.exports = storiesRoute;
