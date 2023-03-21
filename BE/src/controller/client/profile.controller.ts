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
import { SocketAddress } from 'net';
import { profileContants } from '../../constant/profile.contant';
import Profile from '../../model/Account/Profile';
import { IProfile, IRank } from '../../interface/Schema/IProfile';
import { AnyAaaaRecord } from 'dns';
import moment from 'moment';
// const Cloudinary = cloudinary.v2;
const createProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
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
			username: user.username,
		});
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
				if (checkProfile?.avatar.id != undefined) {
					await uploadIMage.deleteImage(checkProfile.avatar?.id)
				}

				checkProfile.avatar = avatar

				await checkProfile
					.save({ session: session })
					.then(async (pro) => {
						await session.commitTransaction();
						session.endSession();
						response.status(201).json({ pro });
					})
					.catch((error) => {
						response.status(500).json({ error });
					});
			} else {
				const ExistName = await ProfileModel.find({ nickname: request.body.nickname }).lean()
				if (ExistName.length > 0) {
					await session.abortTransaction();
					session.endSession();
					return response
						.status(404)
						.json({ status: false, message: 'Nick name is exist' });

				}
				const randomNumber = Math.floor(Math.random() * 1000) + 1;
				const getDOB = moment(new Date(request.body.DOB)).format("DD/MM/YYYY").toString()
				let formData = {
					nickname: request.body.nickname,
					route: request.body.nickname + getDOB.split('/')[0] + randomNumber,
					DOB: moment(new Date(request.body.DOB)).format("DD/MM/YYYY").toString(),
					BIO: request.body.BIO,
					destination: request.body.destination,
					authors: checkUser._id
				}
				// fs.unlinkSync(uploadedFile.path)
				const profile = new ProfileModel(formData);
				checkUser.exist_Profile = true;
				checkUser.save()
				return profile
					.save({ session: session })
					.then(async (pro) => {
						await session.commitTransaction();
						session.endSession();
						response.status(201).json({ pro });
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
	const route = await request.params.routeProfile;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile: any = await ProfileModel.findOne({
			$and: [
				{
					route: route,
				},
				{
					deleted: false,
				}
			]
		}).populate({
			path: 'authors',
			select: 'name username email phone avatar',
		}).lean();
		if (profile) {
			const phone = await Decreypter(profile.authors.phone);
			let star: any = 0;
			let temp: any = {};
			profile.authors.phone = phone;
			await profile.rank.map((item: IRank) => {
				star = star + item.star
				return star;
			});
			temp.id = profile._id;
			temp.authors = profile.authors;
			temp.nickname = profile.nickname;
			temp.DOB = profile.DOB;
			temp.BIO = profile.BIO;
			temp.destination = profile.destination;
			temp.friend = profile.friend;
			temp.follow = profile.follow;
			temp.route = profile.route;
			temp.rank = star / profile.rank.length;
			temp.evaluate = profile.rank.length;
			temp.friendNumber = profile.friend.length;
			temp.followNumber = profile.follow.length;
			await session.commitTransaction();
			session.endSession();
			return response.status(200).json({ profile: temp });
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
		const account = await AuthorModel.findById(id);
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
	const r: any = request
	const user = r.user
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
			fs.unlinkSync(uploadedFile.path)
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

const addFriendProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
	const id = request.body.idProfile
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id })
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		if (profileMe == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Create profile before add friend');
		}
		let check: boolean = false;
		await profileMe.friend.find((element: any) => {
			if (element.id.toString() === profile._id.toString()) {
				check = true;
				return check;
			}
			check = false;
			return check;
		});
		if (check == false) {
			profileMe.friend.push({
				id: profile._id,
				accept: false
			})
		}
		profileMe.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			})
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
}

const acceptFriendProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
	const id = request.body.idProfile
	const accept = request.body.accept
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id })
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		if (profileMe == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Create profile before add friend');
		}

		if (accept == false) {
			await profileMe.friend.map((element: any, index: number) => {
				if (element.id.toString() == id) {
					profileMe.friend.splice(index, 1)
				}
			});
		} else {
			await profileMe.friend.map((element: any) => {
				if (element.id.toString() === profile._id.toString()) {
					element.accept = true;
				}
			});
		}
		profileMe.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			})
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
}

const rankProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
	const id = request.body.idProfile
	const star = request.body.star
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id })
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		if (profileMe == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Create profile before add friend');
		}
		let check: boolean = false;
		await profileMe.rank.find((element: any) => {
			if (element.id.toString() === profile._id.toString()) {
				check = true;
				element.star = star
				return check;
			}
			check = false;
			return check;
		});
		if (check == false) {
			profileMe.rank.push({
				id: profile._id,
				star: star
			});
		}
		profileMe.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			})
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
}

const followProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
	const id = request.body.idProfile
	const typeFollow = request.body.star
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id })
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		if (profileMe == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Create profile before add friend');
		}
		let check: boolean = false;
		await profileMe.follow.find((element: any) => {
			if (element.id.toString() === id) {
				check = true;
				return check;
			}
			check = false;
			return check;
		});
		if (check == false) {
			profileMe.follow.push({
				id: profile._id,
				typeFollow: typeFollow
			});
		} else {
			await profileMe.follow.map((element: any, index: number) => {
				if (element.id.toString() === id) {
					profileMe.follow.splice(index, 1)
					return;
				}
			})
		}
		profileMe.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			})
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
}

const updateAvatarSave = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request
	const user = r.user
	const id = request.body.idProfile
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id)
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		profile.avatar_saved = true;
		profile.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(201).json({ pro });
			})
			.catch(async (error) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json(error);
			})

	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}

}
export default {
	createProfile,
	viewProfile,
	updateProfile,
	getProfileAccount,
	updateProfileBackground,
	addFriendProfile,
	acceptFriendProfile,
	rankProfile,
	followProfile,
	updateAvatarSave
};
