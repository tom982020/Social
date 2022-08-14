"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controller/Author"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const routerUser = express_1.default.Router();
// routerUser.use(checkToken)
routerUser.get('/', auth_middleware_1.checkToken, Author_1.default.readAllAuthor);
routerUser.get('/checktoken/:authorId', Author_1.default.testJWT);
routerUser.get('/:authorId', Author_1.default.readAuthor);
routerUser.post('/create', Author_1.default.createAuthor);
routerUser.put('/update/:authorId', Author_1.default.updateAuthor);
routerUser.delete('/delete/:authorId', Author_1.default.deleteAuthor);
module.exports = routerUser;
