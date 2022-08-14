"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controller/Author"));
const routerLogin = express_1.default.Router();
routerLogin.post('/', Author_1.default.loginAuthor);
module.exports = routerLogin;
