/** @format */

import { NextFunction, Request, Response } from 'express';
import ProfileModel from '../../model/Account/Profile';
import AuthorModel from '../../model/Account/Author';
import mongoose from 'mongoose';
// import cloudinary from 'cloudinary';
import uploadIMage from '../../service/uploadImage.service';
import { handleSingleUploadFile } from '../../library/handleSingleUploadFile';
import { UploadedFile } from '../../interface/upload/image';
import fs from 'fs'
import { Decreypter } from '../../library/Cipher';
// const Cloudinary = cloudinary.v2;
const createProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const uploadResult = await handleSingleUploadFile(request, response).then().catch((err) => {
		return response
			.status(404)
			.json({ status: false, message: err.message });
	});
	const uploadedFile: UploadedFile = uploadResult.file;
	let session = await mongoose.startSession();
	session.startTransaction();

	try {
		const checkUser = await AuthorModel.findOne({
			username: request.body.username,
		}).lean();
		if (checkUser) {
			const checkProfile = await ProfileModel.findOne({
				authors: checkUser._id,
			});
			if (checkProfile) {
				// const data = fs.readFileSync(formData.image, 'utf8');
				const image = await uploadIMage.uploadAvatar(uploadedFile.path);
				let avatar = {
					id: image?.public_id,
					url: image?.url,
					secure_url: image?.secure_url,
					format: image?.format,
					resource_type: image?.resource_type,
					created_at: image?.created_at,
				}
				fs.unlinkSync(uploadedFile.path)

				checkProfile.avatar = avatar
				checkProfile.nickname = request.body.nickname;
				checkProfile.DOB = request.body.DOB;
				checkProfile.BIO = request.body.BIO;
				checkProfile.destination = request.body.destination;

				await checkProfile
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
				let formData = {
					nickname: request.body.nickname,
					DOB: request.body.DOB,
					BIO: request.body.BIO,
					destination: request.body.destination,
					authors: checkUser._id
				}
				fs.unlinkSync(uploadedFile.path)
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
		// const user = request.body.user;
		const id = request.params.idAuthor;
		const profile: any = await ProfileModel.findOne({ authors: id }).populate({
			path: 'authors',
			select: 'name username email phone avatar',
		}).lean();
		if (profile) {
			const phone = await Decreypter(profile.authors.phone);
			profile.authors.phone = phone
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
	const uploadResult = await handleSingleUploadFile(request, response);
	const uploadedFile: UploadedFile = uploadResult.file;
	try {
		const profile = await ProfileModel.findById(id);
		if (profile) {
			profile.nickname = request.body.nickname ? request.body.nickname : profile.nickname;
			profile.DOB = request.body.DOB ? request.body.DOB : profile.DOB;
			profile.BIO = request.body.BIO ? request.body.BIO : profile.DOB;
			const imageAvatar = await uploadIMage.uploadAvatar(uploadedFile.path);
			if (uploadedFile) {
				if (profile.avatar) await uploadIMage.deleteImage(profile.avatar.id)
			}
			let avatar = {
				id: imageAvatar?.public_id,
				url: imageAvatar?.url,
				secure_url: imageAvatar?.secure_url,
				format: imageAvatar?.format,
				resource_type: imageAvatar?.resource_type,
				created_at: imageAvatar?.created_at,
			}
			profile.avatar = avatar ? avatar : profile.avatar;
			profile.destination = request.body.destination
				? request.body.destination
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

const updateProfileBackground = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.id;

	try {
		const profile = await ProfileModel.findById(id);
		const user = request
		if (profile) {
			await handleSingleUploadFile(request, response).then(async (result: any) => {
				if (result) {
					if (profile.background.id != null) {
						await uploadIMage.deleteImage(profile.background.id)
					}
				}
				const image = await uploadIMage.uploadBackground(result.file.path);
				fs.unlinkSync(result.file.path)


				let background = {
					id: image?.public_id,
					url: image?.url,
					secure_url: image?.secure_url,
					format: image?.format,
					resource_type: image?.resource_type,
					created_at: image?.created_at,
				}
				profile.background = background
					? background
					: profile.background;

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
			}).catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response
					.status(400)
					.json({ status: false, message: err.message });
			})

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
	updateProfileBackground,
};
