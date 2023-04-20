/** @format */

import { NextFunction, Request, Response } from 'express';
import ProfileModel from '../../model/Account/Profile';
import AuthorModel from '../../model/Account/Author';
import mongoose from 'mongoose';
// import cloudinary from 'cloudinary';
import uploadIMage from '../../service/uploadImage.service';
import {
	handleSingleUploadFile,
	handleSingleUploadFileNoLimit,
} from '../../library/handleSingleUploadFile';
import { UploadedFile } from '../../interface/upload/image';
import fs from 'fs';
import { Decrypter } from '../../library/Cipher';
import { IRank } from '../../interface/Schema/IProfile';
import moment from 'moment';
import paginateHandler from '../../library/paginate';
import FriendModel from '../../model/Account/Friend';
// const Cloudinary = cloudinary.v2;
const createProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const uploadResult = await handleSingleUploadFile(request, response)
		.then()
		.catch((err) => {
			return response.status(404).json({ status: false, message: err.message });
		});
	const uploadedFile: UploadedFile = uploadResult.file;
	let session = await mongoose.startSession();
	session.startTransaction();

	try {
		const checkUser = await AuthorModel.findOne({
			username: user.authors.username,
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
				};
				fs.unlinkSync(uploadedFile.path);
				if (checkProfile?.avatar.id != undefined) {
					await uploadIMage.deleteImage(checkProfile.avatar?.id);
				}

				checkProfile.avatar = avatar;

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
				const ExistName = await ProfileModel.find({
					nickname: request.body.nickname,
				}).lean();
				if (ExistName.length > 0) {
					await session.abortTransaction();
					session.endSession();
					return response
						.status(404)
						.json({ status: false, message: 'Nick name is exist' });
				}
				const randomNumber = Math.floor(Math.random() * 1000) + 1;
				const getDOB = moment(new Date(request.body.DOB))
					.format('DD/MM/YYYY')
					.toString();
				let formData = {
					nickname: request.body.nickname,
					route:
						request.body.nickname.replace(' ', '-') +
						getDOB.split('/')[0] +
						randomNumber,
					DOB: moment(new Date(request.body.DOB))
						.format('DD/MM/YYYY')
						.toString(),
					BIO: request.body.BIO,
					destination: request.body.destination,
					authors: checkUser._id,
				};
				// fs.unlinkSync(uploadedFile.path)
				const profile = new ProfileModel(formData);
				checkUser.exist_Profile = true;
				checkUser.save();
				return profile
					.save({ session: session })
					.then(async (pro) => {
						await session.commitTransaction();
						session.endSession();
						response.status(201).json({ pro, checkUser });
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
				},
			],
		})
			.populate({
				path: 'authors',
				select: 'name username email phone avatar',
			})
			.lean();
		if (profile) {
			const phone = await Decrypter(profile.authors.phone);
			let star: any = 0;
			let temp: any = {};
			profile.authors.phone = phone;
			await profile.rank.map((item: IRank) => {
				star = star + item.star;
				return star;
			});
			temp.id = profile._id;
			temp.authors = profile.authors;
			temp.nickname = profile.nickname;
			temp.DOB = profile.DOB;
			temp.BIO = profile.BIO;
			temp.avatar = profile.avatar;
			temp.destination = profile.destination;
			temp.follow = profile.follow;
			temp.route = profile.route;
			temp.rank = star / profile.rank.length;
			temp.evaluate = profile.rank.length;
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
		const profile = await ProfileModel.findOne({
			authors: id,
		}).populate({
			path: 'authors',
		});
		if (account) {
			let pho: any;
			pho = await Decrypter(account.phone);
			do {
				pho = await Decrypter(account.phone);
			} while (pho == undefined);
			account.phone = pho;
			await session.commitTransaction();
			session.endSession();
			return res.status(200).json({ account, profile });
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
	const r: any = request;
	const user = r.user;
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.id;
	const uploadResult = await handleSingleUploadFile(request, response);
	const uploadedFile: UploadedFile = uploadResult.file;
	try {
		const profile = await ProfileModel.findById(id);
		if (profile) {
			profile.nickname = request.body.nickname
				? request.body.nickname
				: profile.nickname;
			profile.DOB = request.body.DOB ? request.body.DOB : profile.DOB;
			profile.BIO = request.body.BIO ? request.body.BIO : profile.DOB;
			const imageAvatar = await uploadIMage.uploadAvatar(uploadedFile.path);
			if (uploadedFile) {
				if (profile.avatar) await uploadIMage.deleteImage(profile.avatar.id);
			}
			let avatar = {
				id: imageAvatar?.public_id,
				url: imageAvatar?.url,
				secure_url: imageAvatar?.secure_url,
				format: imageAvatar?.format,
				resource_type: imageAvatar?.resource_type,
				created_at: imageAvatar?.created_at,
			};
			fs.unlinkSync(uploadedFile.path);
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
	const uploadResult = await handleSingleUploadFile(request, response)
		.then()
		.catch((err) => {
			return response.status(404).json({ status: false, message: err.message });
		});
	const uploadedFile: UploadedFile = uploadResult.file;
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.id;

	try {
		const profile = await ProfileModel.findById(id);
		if (profile) {
			if (profile.background.id != undefined) {
				await uploadIMage.deleteImage(profile.background.id);
			}
			const image = await uploadIMage.uploadBackground(uploadedFile.path);
			fs.unlinkSync(uploadedFile.path);

			let background = {
				id: image?.public_id,
				url: image?.url,
				secure_url: image?.secure_url,
				format: image?.format,
				resource_type: image?.resource_type,
				created_at: image?.created_at,
			};
			profile.background = background ? background : profile.background;

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

const addFriendProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.body.idProfile;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.authors._id });
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
		const friend = await FriendModel.findOne({
			$and: [
				{
					idProfile: profileMe._id,
				},
				{
					idFriend: profile._id,
				},
			],
		});
		if (friend != undefined) {
			await session.abortTransaction();
			session.endSession();
			return response
				.status(400)
				.json('You should to wait he/she accept friend');
		}
		let formData = {
			idProfile: profileMe._id,
			idFriend: profile._id,
		};
		const newFriend = new FriendModel(formData);
		newFriend
			.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			});
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const acceptFriendProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.body.idProfile;
	const accept = request.body.accept;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.authors._id });
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
		const friend = await FriendModel.findOne({
			$and: [
				{
					idProfile: profileMe._id,
				},
				{
					idFriend: profile._id,
				},
			],
		});
		if (friend == undefined) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Dont decline friend');
		}
		if (accept == false) {
			friend.deleted = true;
			friend
				.save()
				.then(async (pro) => {
					await session.commitTransaction();
					session.endSession();
					response.status(200).json({ pro });
				})
				.catch(async (err) => {
					await session.abortTransaction();
					session.endSession();
					return response.status(500).json({ error: err });
				});
		} else {
			friend.accept = true;
			let formData = {
				idProfile: profile._id,
				idFriend: profileMe._id,
				accept: true,
			};
			const newFriend = new FriendModel(formData);
			friend
				.save()
				.then(async (pro) => {
					newFriend
						.save()
						.then(async () => {
							await session.commitTransaction();
							session.endSession();
							response.status(200).json({ pro });
						})
						.catch(async (err) => {
							await session.abortTransaction();
							session.endSession();
							return response.status(500).json({ error: err });
						});
				})
				.catch(async (err) => {
					await session.abortTransaction();
					session.endSession();
					return response.status(500).json({ error: err });
				});
		}
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const rankProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.body.idProfile;
	const star = request.body.star;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id });
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
				element.star = star;
				return check;
			}
			check = false;
			return check;
		});
		if (check == false) {
			profileMe.rank.push({
				id: profile._id,
				star: star,
			});
		}
		profileMe
			.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			});
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const followProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.body.idProfile;
	const typeFollow = request.body.star;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		const profileMe = await ProfileModel.findOne({ authors: user.id });
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
				typeFollow: typeFollow,
			});
		} else {
			await profileMe.follow.map((element: any, index: number) => {
				if (element.id.toString() === id) {
					profileMe.follow.splice(index, 1);
					return;
				}
			});
		}
		profileMe
			.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(200).json({ pro });
			})
			.catch(async (err) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json({ error: err });
			});
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const updateAvatarSave = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.params.idProfile;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const profile = await ProfileModel.findById(id);
		if (profile == null) {
			await session.abortTransaction();
			session.endSession();
			return response.status(400).json('Profile not found');
		}
		profile.avatar_saved = true;
		profile
			.save()
			.then(async (pro) => {
				await session.commitTransaction();
				session.endSession();
				response.status(201).json({ pro });
			})
			.catch(async (error) => {
				await session.abortTransaction();
				session.endSession();
				return response.status(500).json(error);
			});
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const getFriendProfile = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	const id = request.params.idProfile;
	let session = await mongoose.startSession();
	session.startTransaction();
	try {
		const populate = {
			path: 'idFriend',
		};
		// request.query.idFriend = id;
		request.query.idProfile = id;
		request.query.accept = 'true';
		request.query.deleted = 'false';
		// request.query.friend = [
		// 	{
		// 		accept: { $ne: 'true' }
		// 	}
		// ]
		const result = await paginateHandler(
			request.query,
			FriendModel,
			null,
			populate
		);
		await session.commitTransaction();
		session.endSession();
		response.status(200).json({ result });
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const searchFriend = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.idProfile;
	try {
		const populate = {
			path: 'idFriend',
		};
		// request.query.idFriend = id;
		request.query.idProfile = user._id;
		request.query.accept = 'true';
		request.query.deleted = 'false';
		if (request.query.search) {
			const idProfile = await ProfileModel.find({
				$or: [
					{
						nickname: new RegExp(request.query.search.toString(), 'i'),
					},
				],
			}).select('_id');
			const arrayProfile = idProfile.map((item) => {
				return item._id.toString();
			});
			request.query = {
				$and: [
					{
						idFriend: { $in: arrayProfile },
					},
					{
						idProfile: user._id,
					},
				],
			};
			delete request.query.search;
		}
		const result = await paginateHandler(
			request.query,
			FriendModel,
			null,
			populate
		);
		await session.commitTransaction();
		session.endSession();
		response.status(200).json({ result });
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		return response.status(500).json({ error: err });
	}
};

const getPeople = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const r: any = request;
	const user = r.user;
	let session = await mongoose.startSession();
	session.startTransaction();
	const id = request.params.idProfile;
	try {
		request.query.deleted = 'false';
		if (request.query.search != '') {
			request.query.nickname = { $regex: '.*' + request.query.search + '.*' };
			delete request.query.search;
		} else {
			delete request.query.search;
		}
		const result = await paginateHandler(
			request.query,
			ProfileModel,
			null,
			null
		);
		await session.commitTransaction();
		session.endSession();
		response.status(200).json({ result });
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
	addFriendProfile,
	acceptFriendProfile,
	rankProfile,
	followProfile,
	updateAvatarSave,
	getFriendProfile,
	searchFriend,
	getPeople,
};
