"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const author_controller_1 = __importDefault(require("../../controller/client/author.controller"));
const routerUser = express_1.default.Router();
// routerUser.use(checkToken);
routerUser.get('/', author_controller_1.default.readAllAuthor);
routerUser.get('/checktoken/:authorId', author_controller_1.default.testJWT);
routerUser.get('/:authorId', author_controller_1.default.readAuthor);
routerUser.post('/create', author_controller_1.default.createAuthor);
routerUser.put('/update/:authorId', author_controller_1.default.updateAuthor);
routerUser.delete('/delete/:authorId', author_controller_1.default.deleteAuthor);
module.exports = routerUser;
