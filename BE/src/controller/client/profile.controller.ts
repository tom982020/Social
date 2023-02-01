/** @format */

import { NextFunction, Request, Response } from 'express';
import ProfileModel from '../../model/Profile';
import AuthorModel from '../../model/Author';
import mongoose from 'mongoose';
// import cloudinary from 'cloudinary';
import uploadIMage from '../../service/uploadImage.service';
import fs from 'fs';

// const Cloudinary = cloudinary.v2;

const createProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const formData = request.body;
	const file = request.file;
	let session = await mongoose.startSession();
	session.startTransaction();

	try {
		const checkUser = await AuthorModel.findOne({
			username: formData.username,
		}).lean();
		if (checkUser) {
			const checkProfile = await ProfileModel.findOne({
				authors: checkUser._id,
			});
			if (checkProfile) {
				const data = fs.readFileSync(formData.image, 'utf8');
				const image = uploadIMage?.uploadImage(data);
				// 	let avatar = {
				// 		id: images.public_id,
				// url: images.url
				// secure_url: image.secure_url,
				// format: image.format,
				// resource_type: image.resourresource_type,
				// created_at: image.created_at,
				// 	}
				// })
				console.log(image);
				return;

				// checkProfile.avatar = image
				// checkProfile.nickname = formData.nickname;
				// checkProfile.DOB = formData.DOB;
				// checkProfile.BIO = formData.BIO;
				// checkProfile.destination = formData.destination;

				// await checkProfile
				// 	.save({ session: session })
				// 	.then(async (pro) => {
				// 		await session.commitTransaction();
				// 		session.endSession();
				// 		response.status(200).json({ pro });
				// 	})
				// 	.catch((error) => {
				// 		response.status(500).json({ error });
				// 	});
			} else {
				formData.authors = checkUser._id;
				const profile = new ProfileModel(formData);
				return profile
					.save({ session: session })
					.then(async (pro) => {
						await session.commitTransaction();
						session.endSession();
						response.status(200).json({ pro });
					})
					.catch((error) => {
						response.status(500).json({ error });
					});
			}
		} else {
			await session.abortTransaction();
			session.endSession();
			return response
				.status(404)
				.json({ status: false, message: 'User not found' });
		}
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const viewProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user = request.body.user;
		const id = request.params.idAuthor;
		const profile = await ProfileModel.findOne({ authors: id }).populate({
			path: 'authors',
			select: 'name username email phone',
		});
		if (profile) {
			await session.commitTransaction();
			session.endSession();
			return response.status(200).json({ profile: profile });
		} else {
			await session.abortTransaction();
			session.endSession();
			return response
				.status(400)
				.json({ status: false, message: 'Profile not found' });
		}
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const getProfileAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = req.params.idAccount;
	try {
		const account = await AuthorModel.findOne({ authors: id });
		if (account) {
			await session.commitTransaction();
			session.endSession();
			return res.status(200).json({ account });
		} else {
			await session.commitTransaction();
			session.endSession();
			return res.status(404).json({ message: 'Account not found' });
		}
	} catch (err) {
		await session.commitTransaction();
		session.endSession();
		return res.status(500).json({ message: err });
	}
};

const updateProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.id;
	const formData = request.body;
	try {
		const profile = await ProfileModel.findById(id);
		if (profile) {
			profile.nickname = formData.nickname;
			profile.DOB = formData.DOB;
			profile.BIO = formData.BIO;
			profile.avatar = formData.avatar ? formData.avatar : profile.avatar;
			profile.background = formData.background
				? formData.background
				: profile.background;
			profile.destination = formData.destination
				? formData.destination
				: profile.destination;

			await profile
				.save({ session: session })
				.then(async (pro) => {
					await session.commitTransaction();
					session.endSession();
					response.status(200).json({ pro });
				})
				.catch((error) => {
					response.status(500).json({ error });
				});
		} else {
			await session.abortTransaction();
			session.endSession();
			return response
				.status(400)
				.json({ status: false, message: 'Profile not found' });
		}
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

export default {
	createProfile,
	viewProfile,
	updateProfile,
	getProfileAccount,
};
