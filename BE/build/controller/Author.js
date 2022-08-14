"use strict";
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
const Author_1 = __importDefault(require("../model/Author"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, email } = req.body;
    // Tìm username hoặc email đã tồn tại
    const checkUser = yield Author_1.default.exists({ username: username });
    if (checkUser == null) {
        const salt = bcrypt_1.default.genSaltSync(config_1.config.satlRound);
        // Tạo mã hash cho satl với password với 100 kí tự mã hóa
        const hash = bcrypt_1.default.hashSync(password, salt);
        const author = new Author_1.default();
        author.name = name;
        author.username = username;
        author.email = email;
        author.hasPassword = hash;
        author.created = new Date();
        return author
            .save()
            .then((author) => res.status(201).json({ author }))
            .catch((err) => res.status(500).json({ error: err }));
    }
    return res.status(500).json({ error: "Tài khỏan hoặc email đã tồn tại" });
});
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        //   const decode = jwt.verify(
        //     author?.access_token,
        //     config.secret,
        //     (err: any, result: any) => {
        //       if (result) return result;
        //     }
        //   );
        author
            ? res.status(200).json({ author: author })
            : res.status(404).json({ message: "Author not found" });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const updateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(200).json({ author }))
                .catch((err) => res.status(500).json({ error: err }));
        }
        else {
            return res.status(404).json({ message: "Author not found" });
        }
    })
        .catch((err) => res.status(500).json({ error: err }));
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
        ? res.status(200).json({ message: "Delete" })
        : res.status(404).json({ message: "Author not found" }))
        .catch((err) => res.status(500).json({ error: err }));
};
const loginAuthor = (req, res, next) => {
    Author_1.default.find()
        .or([{ email: req.body.email }, { username: req.body.username }])
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user === null) {
            return res.status(400).send({
                message: "User not found",
            });
        }
        else {
            const hash = bcrypt_1.default.compareSync(req.body.password, user[0].hasPassword);
            const users = {
                name: user[0].name,
                username: user[0].username,
                hasPassword: user[0].hasPassword,
                email: user[0].email,
                created: user[0].created,
            };
            const token = jsonwebtoken_1.default.sign({ data: users }, config_1.config.secret, {
                expiresIn: "30m",
            });
            if (hash === true) {
                yield user[0].updateOne({ access_token: token });
                return res.status(201).json({
                    message: "Log in",
                    access_token: token
                });
            }
            else {
                return res.status(400).send({
                    message: "Wrong password",
                });
            }
        }
    }))
        .catch((error) => {
        return res.status(500).send({ message: error });
    });
};
const testJWT = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId).then((author) => {
        jsonwebtoken_1.default.verify(author === null || author === void 0 ? void 0 : author.access_token, config_1.config.secret);
    });
};
exports.default = {
    createAuthor,
    readAuthor,
    updateAuthor,
    readAllAuthor,
    deleteAuthor,
    loginAuthor,
    testJWT,
};
