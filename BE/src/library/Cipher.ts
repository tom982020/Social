/** @format */

import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';

const sercurity =
	process.env.SERCURITY_ENCRYPT || 'cKyWAtcmjr9WSv3hNfSvxtAN4e5PygEQ';
const vector = process.env.VECTOR || '1234567812345678'

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

export const Encrypter = (phone: string) => {
	const cipher = crypto.createCipheriv(algorithm, sercurity, vector);

	let encryptedData = cipher.update(phone, 'utf8', 'hex');

	encryptedData += cipher.final('hex');

	return encryptedData;
};

export const Decrypter = (phone: string) => {
	const decipher = crypto.createDecipheriv(algorithm, sercurity, vector);

	let decryptedData = decipher.update(phone, 'hex', 'utf8');

	decryptedData += decipher.final('utf8');
	return decryptedData;
};
