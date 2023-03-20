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

const uploadImage = async (imagePath: any) => {
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
			effect: "improve"
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};

const uploadImageVideo = async (imagePath: any) => {
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
			crop: "scale",
			audio_codec: "none",
			effect: "boomerang", duration: "8",
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};
const uploadVideo = async (imagePath: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'video',
			crop: "scale",
			end_offset: "60",
			audio_codec: "none",
			eager_async: true
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};

const uploadShortVideo = async (imagePath: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'video',
			crop: "scale",
			end_offset: "4",
			audio_codec: "none",
			effect: "boomerang", duration: "4",
			eager_async: true
		})
		.then(async (result) => {
			await res.push(result);
		});
	return res[0];
};
const uploadMp3 = async (imagePath: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.uploader
		.upload(imagePath, {
			resource_type: 'video'
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

const deleteVideo = async (publicId: any) => {
	let res: any = [];
	cloudinary.config({
		cloud_name: config.CLOUD_NAME,
		api_key: config.API_KEY,
		api_secret: config.API_SECRET,
		secure: true,
	});
	await cloudinary.api.delete_resources_by_prefix(publicId)
		.then(async (result) => {
			await res.push(result)
		})
	return res[0];
};

export default {
	uploadAvatar,
	uploadBackground,
	deleteImage,
	uploadImage,
	uploadShortVideo,
	uploadVideo,
	deleteVideo,
	uploadMp3,
	uploadImageVideo
};
