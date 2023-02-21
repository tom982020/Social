/** @format */

import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';

const sercurity =
	process.env.SERCURITY_ENCRYPT || 'cKyWAtcmjr9WSv3hNfSvxtAN4e5PygEQ';

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

export const Encrypter = (phone: string) => {
	const cipher = crypto.createCipheriv(algorithm, sercurity, initVector);

	let encryptedData = cipher.update(phone, 'utf8', 'binary');

	encryptedData += cipher.final('binary');

	return encryptedData;
};

export const Decreypter = (phone: string) => {
	const decipher = crypto.createDecipheriv(algorithm, sercurity, initVector);

	let decryptedData = decipher.update(phone, 'binary', 'utf8');

	decryptedData += decipher.final('utf8');
	return decryptedData;
};
