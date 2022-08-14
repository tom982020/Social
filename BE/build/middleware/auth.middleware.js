"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const checkToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-header-token'];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.config.secret, (err, decoded) => {
            if (err)
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            next();
        });
    }
    else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};
exports.checkToken = checkToken;
