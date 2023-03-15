/** @format */

import { FileReadOptions, FileReadResult } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { config } from '../config/config';
import fs from 'fs'

dotenv.config();

const uploadAvatar = async (imagePath: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'image',
			transformation: [
				{ width: 500, height: 500, gravity: "faces", crop: "thumb" }
			],
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};

const uploadBackground = async (imagePath: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'image',
			transformation: [
				{ effect: "trim:20" }
			],
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};

const deleteImage = async (publicId: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.destroy(publicId, {
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};

export default {
	uploadAvatar,
	uploadBackground,
	deleteImage,
};
