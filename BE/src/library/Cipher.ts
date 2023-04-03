/** @format */

import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';

const sercurity =
	process.env.SERCURITY_ENCRYPT || 'cKyWAtcmjr9WSv3hNfSvxtAN4e5PygEQ';
const vector = process.env.VECTOR || '1234567812345678'

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

export const Encrypter = (phone: string) => {
	const codeRandom = [process.env.VECTOR, process.env.VECTOR2, process.env.VECTOR3, process.env.VECTOR4]
	let random = Math.floor(Math.random() * codeRandom.length)
	let code: any = codeRandom[random]
	const cipher = crypto.createCipheriv(algorithm, sercurity, code);
	let encryptedData = cipher.update(phone, 'utf8', 'hex');

	encryptedData += cipher.final('hex');

	return encryptedData;
};

export const Decrypter = async (phone: string) => {
	const codeRandom = [process.env.VECTOR, process.env.VECTOR2, process.env.VECTOR3, process.env.VECTOR4]
	let random = Math.floor(Math.random() * codeRandom.length)
	let code: any = codeRandom[random]
	let result: any;
	const decipher = crypto.createDecipheriv(algorithm, sercurity, code);
	try {
		let decryptedData = await decipher.update(phone, 'hex', 'utf8');
		decryptedData += decipher.final('utf8');
		result = decryptedData;
	} catch (e) {
		Decrypter(phone)
	}
	return result;
};
