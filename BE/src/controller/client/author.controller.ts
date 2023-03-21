/** @format */

import { NextFunction, Request, Response } from 'express';
import Author from '../../model/Account/Author';
import HistoryAccount from '../../model/Account/HistoryAccount';
import Profile from '../../model/Account/Profile';
import bcrypt from 'bcrypt';
import { config } from '../../config/config';
import { Encrypter, Decreypter } from '../../library/Cipher';
import jwt from 'jsonwebtoken';
import { constantshistoryAccount } from '../../constant/historyAccount.constant';
import { IAuthorResponse } from '../../interface/Schema/IAuthor';
import { IError } from '../../interface/err/IError';

const createAuthor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, username, password, email, phone } = req.body;
	// console.log(req.body);

	// Tìm username hoặc email đã tồn tại
	const checkUser = await Author.findOne({ username: username }).lean();
	if (checkUser == null) {
		const salt = bcrypt.genSaltSync(config.satlRound);

		const hash = bcrypt.hashSync(password, parseInt(salt));
		const author = new Author();
		// Tạo mã hash cho satl với password với 100 kí tự mã hóa
		author.hasPassword = hash;
		author.username = username;
		author.email = email;
		author.phone = await Encrypter(phone);
		return author
			.save()
			.then((author: IAuthorResponse) => {
				const history = new HistoryAccount();
				history.idAccount = author._id;
				history.description = 'Create user successfully';
				history.type = constantshistoryAccount.typehistory.create;
				history.save();
				res.status(201).json({ author });
			})
			.catch((err: IError) => {
				const history = new HistoryAccount();
				history.description = 'Create user error' + err;
				history.type = constantshistoryAccount.typehistory.error;
				history.save();
				res.status(500).json({ error: err });
			});
	} else {
		const history = new HistoryAccount();
		history.description = 'Create user error, User Existed';
		history.type = constantshistoryAccount.typehistory.error;
		history.save();
		return res.status(500).json({ message: 'Tài khỏan hoặc email đã tồn tại' });
	}
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then(async (author: any) => {
			const phone = await Decreypter(author.phone);
			author.phone = phone;
			author
				? res.status(200).json({ author: author })
				: res.status(404).json({ message: 'Author not found' });
		})
		.catch((err) => res.status(500).json({ error: err }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then((authors: IAuthorResponse | any) => {
			if (authors) {
				authors.set(req.body);

				return authors
					.save()
					.then((author: IAuthorResponse) => {
						const history = new HistoryAccount();
						history.idAccount = author._id;
						history.description = 'Update user successfully';
						history.type = constantshistoryAccount.typehistory.update;
						history.save();
						res.status(200).json({ author });
					})
					.catch((err: IError) => res.status(500).json({ error: err }));
			} else {
				const history = new HistoryAccount();
				history.idAccount = authors._id;
				history.description = 'Update user Error';
				history.type = constantshistoryAccount.typehistory.update;
				history.save();
				return res.status(404).json({ message: 'Author not found' });
			}
		})
		.catch((err: IError) => {
			const history = new HistoryAccount();
			history.description = 'Update user error' + err;
			history.type = constantshistoryAccount.typehistory.error;
			history.save();
			res.status(500).json({ error: err });
		});
};
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
	return Author.find()
		.then((author) => res.status(200).json({ author: author }))
		.catch((err) => res.status(500).json({ error: err }));
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findByIdAndDelete(authorId)
		.then((author) =>
			author
				? res.status(200).json({ message: 'Delete' })
				: res.status(404).json({ message: 'Author not found' })
		)
		.catch((err) => res.status(500).json({ error: err }));
};

const loginAuthor = async (req: Request, res: Response, next: NextFunction) => {
	await Author.find()
		.or([{ email: req.body.email }, { username: req.body.username }])
		.then(async (user: any) => {
			if (user === null) {
				return res.status(400).send({
					message: 'User not found',
				});
			} else {
				const hash = bcrypt.compareSync(req.body.password, user[0].hasPassword);
				const profileModel = await Profile.findOne({ authors: user[0]._id });
				const users = {
					username: user[0].username,
					hasPassword: user[0].hasPassword,
					email: user[0].email,
					phone: user[0].phone,
					created: user[0].created,
					exist_Profile: user[0].exist_Profile,
					type: user[0].type,
					id: user[0]._id,
					profile: profileModel
				};

				let history = user[0].historyLogin;
				if (history.length == 0) {
					await history.push({
						username: user[0].username,
						idProfile: profileModel?._id || null,
						dateLogin: Date.now(),
						IpAdress: req.socket.remoteAddress,
					});
				} else {
					await user[0].historyLogin.map(async (item: any) => {
						if (item.IpAdress != req.socket.remoteAddress) {
							await history.push({
								username: user[0].username,
								idProfile: profileModel?._id || null,
								dateLogin: Date.now(),
								IpAdress: req.socket.remoteAddress,
							});
						} else {
							item.dateLogin = Date.now();
						}
					})
				}


				const token = jwt.sign({ data: users }, config.secret, {
					expiresIn: '1m',
				});
				const refeshtoken = jwt.sign({ data: users }, config.secret, {
					expiresIn: '1y',
				});
				if (hash === true) {
					await user[0].updateOne({
						historyLogin: history,
						access_token: token,
						refresh_token: refeshtoken,
					});
					return res.status(201).json({
						message: 'Log in',
						access_token: token,
						users,
						refresh_token: refeshtoken,
					});
				} else {
					return res.status(400).send({
						message: 'Wrong password',
					});
				}
			}
		})
		.catch((error) => {
			return res.status(500).send({ message: error });
		});

	// return res.status(200).json({ rl });
};

const testJWT = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;
	return Author.findById(authorId).then((author: any) => {
		jwt.verify(author?.access_token, config.secret);
	});
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const access_token =
		req.body.access_token ||
		req.query.access_token ||
		req.headers['x-header-token'] ||
		req.headers.authorization?.split(' ')[1];
	const refresh_token =
		req.body.refresh_token ||
		req.query.refresh_token ||
		req.headers['x-header-token'] ||
		req.headers.authorization?.split(' ')[1];

	if (access_token) {
		jwt.verify(access_token, config.secret, (err: any, decoded: any) => {
			if (err) {
				if (refresh_token) {
					jwt.verify(refresh_token, config.secret, (err: any, decoded: any) => {
						if (err) {
							return res
								.status(401)
								.json({ error: true, message: 'Unauthorized access.' });
						} else {
							return res.status(201).json({
								decode: decoded,
							});
						}
					});
				}
				return res
					.status(401)
					.json({ error: true, message: 'Unauthorized access.' });
			} else {
				return res.status(201).json({
					decode: decoded,
				});
			}
		});
	}
};

export default {
	createAuthor,
	readAuthor,
	updateAuthor,
	readAllAuthor,
	deleteAuthor,
	loginAuthor,
	testJWT,
	verifyToken,
};
