/** @format */

import { FileReadOptions, FileReadResult } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { config } from '../config/config';
import fs from 'fs'

dotenv.config();

const uploadImage = async (imagePath: any) => {
	let res;
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'image',
		})
		.then((result) => {
			res = result;
		});
	return res;
};

export default {
	uploadImage,
};
