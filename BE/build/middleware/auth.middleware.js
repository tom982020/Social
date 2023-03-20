"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Cipher_1 = require("../library/Cipher");
const checkToken = (req, res, next) => {
    var _a;
    (0, exports.extractToken)(req);
    const token = req.body.token || req.query.token || req.headers['x-header-token'] || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.config.secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(decoded)
            if (err)
                return res
                    .status(401)
                    .json({ error: true, message: 'Unauthorized access.' });
            decoded.data.phone = yield (0, Cipher_1.Decreypter)(decoded.data.phone);
            req.user = decoded.data;
            req.token = token;
            next();
        }));
    }
    else {
        return res.status(403).send({
            error: true,
            message: 'No token provided.',
        });
    }
};
exports.checkToken = checkToken;
const extractToken = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};
exports.extractToken = extractToken;
