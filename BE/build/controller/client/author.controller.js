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
const Author_1 = __importDefault(require("../../model/Account/Author"));
const HistoryAccount_1 = __importDefault(require("../../model/Account/HistoryAccount"));
const Profile_1 = __importDefault(require("../../model/Account/Profile"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config/config");
const Cipher_1 = require("../../library/Cipher");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const historyAccount_constant_1 = require("../../constant/historyAccount.constant");
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email, phone } = req.body;
    // console.log(req.body);
    // Tìm username hoặc email đã tồn tại
    const checkUser = yield Author_1.default.findOne({ username: username }).lean();
    if (checkUser == null) {
        const salt = bcrypt_1.default.genSaltSync(config_1.config.satlRound);
        const hash = bcrypt_1.default.hashSync(password, parseInt(salt));
        const author = new Author_1.default();
        // Tạo mã hash cho satl với password với 100 kí tự mã hóa
        author.hasPassword = hash;
        author.username = username;
        author.email = email;
        author.phone = yield (0, Cipher_1.Encrypter)(phone);
        return author
            .save()
            .then((author) => {
            const history = new HistoryAccount_1.default();
            history.idAccount = author._id;
            history.description = 'Create user successfully';
            history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.create;
            history.save();
            res.status(201).json({ author });
        })
            .catch((err) => {
            const history = new HistoryAccount_1.default();
            history.description = 'Create user error' + err;
            history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.error;
            history.save();
            res.status(500).json({ error: err });
        });
    }
    else {
        const history = new HistoryAccount_1.default();
        history.description = 'Create user error, User Existed';
        history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.error;
        history.save();
        return res.status(500).json({ message: 'Tài khỏan hoặc email đã tồn tại' });
    }
});
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => __awaiter(void 0, void 0, void 0, function* () {
        const phone = yield (0, Cipher_1.Decreypter)(author.phone);
        author.phone = phone;
        author
            ? res.status(200).json({ author: author })
            : res.status(404).json({ message: 'Author not found' });
    }))
        .catch((err) => res.status(500).json({ error: err }));
};
const updateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((authors) => {
        if (authors) {
            authors.set(req.body);
            return authors
                .save()
                .then((author) => {
                const history = new HistoryAccount_1.default();
                history.idAccount = author._id;
                history.description = 'Update user successfully';
                history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.update;
                history.save();
                res.status(200).json({ author });
            })
                .catch((err) => res.status(500).json({ error: err }));
        }
        else {
            const history = new HistoryAccount_1.default();
            history.idAccount = authors._id;
            history.description = 'Update user Error';
            history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.update;
            history.save();
            return res.status(404).json({ message: 'Author not found' });
        }
    })
        .catch((err) => {
        const history = new HistoryAccount_1.default();
        history.description = 'Update user error' + err;
        history.type = historyAccount_constant_1.constantshistoryAccount.typehistory.error;
        history.save();
        res.status(500).json({ error: err });
    });
};
const readAllAuthor = (req, res, next) => {
    return Author_1.default.find()
        .then((author) => res.status(200).json({ author: author }))
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => author
        ? res.status(200).json({ message: 'Delete' })
        : res.status(404).json({ message: 'Author not found' }))
        .catch((err) => res.status(500).json({ error: err }));
};
const loginAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Author_1.default.find()
        .or([{ email: req.body.email }, { username: req.body.username }])
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user === null) {
            return res.status(400).send({
                message: 'User not found',
            });
        }
        else {
            const hash = bcrypt_1.default.compareSync(req.body.password, user[0].hasPassword);
            const profileModel = yield Profile_1.default.findOne({ authors: user[0]._id });
            const users = {
                username: user[0].username,
                hasPassword: user[0].hasPassword,
                email: user[0].email,
                phone: user[0].phone,
                created: user[0].created,
                type: user[0].type,
                id: user[0]._id,
                profile: profileModel
            };
            let history = user[0].historyLogin;
            if (history.length == 0) {
                yield history.push({
                    username: user[0].username,
                    idProfile: (profileModel === null || profileModel === void 0 ? void 0 : profileModel._id) || null,
                    dateLogin: Date.now(),
                    IpAdress: req.socket.remoteAddress,
                });
            }
            else {
                yield user[0].historyLogin.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                    if (item.IpAdress != req.socket.remoteAddress) {
                        yield history.push({
                            username: user[0].username,
                            idProfile: (profileModel === null || profileModel === void 0 ? void 0 : profileModel._id) || null,
                            dateLogin: Date.now(),
                            IpAdress: req.socket.remoteAddress,
                        });
                    }
                    else {
                        item.dateLogin = Date.now();
                    }
                }));
            }
            const token = jsonwebtoken_1.default.sign({ data: users }, config_1.config.secret, {
                expiresIn: '1m',
            });
            const refeshtoken = jsonwebtoken_1.default.sign({ data: users }, config_1.config.secret, {
                expiresIn: '1y',
            });
            if (hash === true) {
                yield user[0].updateOne({
                    historyLogin: history,
                    access_token: token,
                    refresh_token: refeshtoken,
                });
                return res.status(201).json({
                    message: 'Log in',
                    access_token: token,
                    users,
                    refresh_token: refeshtoken,
                });
            }
            else {
                return res.status(400).send({
                    message: 'Wrong password',
                });
            }
        }
    }))
        .catch((error) => {
        return res.status(500).send({ message: error });
    });
    // return res.status(200).json({ rl });
});
const testJWT = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId).then((author) => {
        jsonwebtoken_1.default.verify(author === null || author === void 0 ? void 0 : author.access_token, config_1.config.secret);
    });
};
const verifyToken = (req, res, next) => {
    var _a, _b;
    const access_token = req.body.access_token ||
        req.query.access_token ||
        req.headers['x-header-token'] ||
        ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
    const refresh_token = req.body.refresh_token ||
        req.query.refresh_token ||
        req.headers['x-header-token'] ||
        ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
    if (access_token) {
        jsonwebtoken_1.default.verify(access_token, config_1.config.secret, (err, decoded) => {
            if (err) {
                if (refresh_token) {
                    jsonwebtoken_1.default.verify(refresh_token, config_1.config.secret, (err, decoded) => {
                        if (err) {
                            return res
                                .status(401)
                                .json({ error: true, message: 'Unauthorized access.' });
                        }
                        else {
                            return res.status(201).json({
                                decode: decoded,
                            });
                        }
                    });
                }
                return res
                    .status(401)
                    .json({ error: true, message: 'Unauthorized access.' });
            }
            else {
                return res.status(201).json({
                    decode: decoded,
                });
            }
        });
    }
};
exports.default = {
    createAuthor,
    readAuthor,
    updateAuthor,
    readAllAuthor,
    deleteAuthor,
    loginAuthor,
    testJWT,
    verifyToken,
};
