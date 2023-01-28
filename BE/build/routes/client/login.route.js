"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const author_controller_1 = __importDefault(require("../../controller/client/author.controller"));
const routerLogin = express_1.default.Router();
routerLogin.post('/', author_controller_1.default.loginAuthor);
routerLogin.post('/verify', author_controller_1.default.verifyToken);
module.exports = routerLogin;
