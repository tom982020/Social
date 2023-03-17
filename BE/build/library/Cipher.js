"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decreypter = exports.Encrypter = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const algorithm = 'aes-256-cbc';
const sercurity = process.env.SERCURITY_ENCRYPT || 'cKyWAtcmjr9WSv3hNfSvxtAN4e5PygEQ';
const vector = process.env.VECTOR || '1234567812345678';
// generate 16 bytes of random data
const initVector = crypto_1.default.randomBytes(16);
const Encrypter = (phone) => {
    const cipher = crypto_1.default.createCipheriv(algorithm, sercurity, vector);
    let encryptedData = cipher.update(phone, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};
exports.Encrypter = Encrypter;
const Decreypter = (phone) => {
    const decipher = crypto_1.default.createDecipheriv(algorithm, sercurity, vector);
    let decryptedData = decipher.update(phone, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
};
exports.Decreypter = Decreypter;
