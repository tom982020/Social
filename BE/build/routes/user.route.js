"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RouteUser = (0, express_1.default)();
RouteUser.route('/').get((req, res) => {
    res.send('Hello, world user!');
});
exports.default = RouteUser;
