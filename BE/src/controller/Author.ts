/** @format */

import { NextFunction, Request, Response } from 'express';
import Author from '../model/Author';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';

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
		author.hasPassword = hash;
		author.name = name;
		author.username = username;
		author.email = email;
		author.phone = phone;
		author.created = new Date();
		return author
			.save()
			.then((author) => res.status(201).json({ author }))
			.catch((err) => res.status(500).json({ error: err }));
		// Tạo mã hash cho satl với password với 100 kí tự mã hóa
	} else {
		return res.status(500).json({ error: 'Tài khỏan hoặc email đã tồn tại' });
	}
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then((author: any) => {
			//   const decode = jwt.verify(
			//     author?.access_token,
			//     config.secret,
			//     (err: any, result: any) => {
			//       if (result) return result;
			//     }
			//   );
			author
				? res.status(200).json({ author: author })
				: res.status(404).json({ message: 'Author not found' });
		})
		.catch((err) => res.status(500).json({ error: err }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
	const authorId = req.params.authorId;

	return Author.findById(authorId)
		.then((author) => {
			if (author) {
				author.set(req.body);

				return author
					.save()
					.then((author) => res.status(200).json({ author }))
					.catch((err) => res.status(500).json({ error: err }));
			} else {
				return res.status(404).json({ message: 'Author not found' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
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
				const users = {
					name: user[0].name,
					username: user[0].username,
					hasPassword: user[0].hasPassword,
					email: user[0].email,
					phone : user[0].phone,
					created: user[0].created,
				};
				const token = jwt.sign({ data: users }, config.secret, {
					expiresIn: '30m',
				});
				const refeshtoken = jwt.sign({ data: users }, config.secret, {
					expiresIn: '1y',
				})
				if (hash === true) {
					await user[0].updateOne({ access_token: token , refresh_token: refeshtoken});
					return res.status(201).json({
						message: 'Log in',
						access_token: token,
						users,
						refresh_token: refeshtoken
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

export default {
	createAuthor,
	readAuthor,
	updateAuthor,
	readAllAuthor,
	deleteAuthor,
	loginAuthor,
	testJWT,
};
