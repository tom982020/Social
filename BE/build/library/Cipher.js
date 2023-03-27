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
exports.Decrypter = exports.Encrypter = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const algorithm = 'aes-256-cbc';
const sercurity = process.env.SERCURITY_ENCRYPT || 'cKyWAtcmjr9WSv3hNfSvxtAN4e5PygEQ';
const vector = process.env.VECTOR || '1234567812345678';
// generate 16 bytes of random data
const initVector = crypto_1.default.randomBytes(16);
const Encrypter = (phone) => {
    const codeRandom = [process.env.VECTOR, process.env.VECTOR2, process.env.VECTOR3, process.env.VECTOR4];
    let random = Math.floor(Math.random() * codeRandom.length);
    let code = codeRandom[random];
    const cipher = crypto_1.default.createCipheriv(algorithm, sercurity, code);
    let encryptedData = cipher.update(phone, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};
exports.Encrypter = Encrypter;
const Decrypter = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const codeRandom = [process.env.VECTOR, process.env.VECTOR2, process.env.VECTOR3, process.env.VECTOR4];
    let random = Math.floor(Math.random() * codeRandom.length);
    let code = codeRandom[random];
    let result;
    const decipher = crypto_1.default.createDecipheriv(algorithm, sercurity, code);
    try {
        let decryptedData = yield decipher.update(phone, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        result = decryptedData;
    }
    catch (e) {
        (0, exports.Decrypter)(phone);
    }
    return result;
});
exports.Decrypter = Decrypter;
