/** @format */

import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { Decreypter } from '../library/Cipher';

export const checkToken = (req: any, res: Response, next: NextFunction) => {

	extractToken(req)

	const token =
		req.body.token || req.query.token || req.headers['x-header-token'] || req.headers.authorization?.split(' ')[1];

	if (token) {
		jwt.verify(token, config.secret, async (err: any, decoded: any) => {
			// console.log(decoded)
			if (err)
				return res
					.status(401)
					.json({ error: true, message: 'Unauthorized access.' });
			decoded.data.phone = await Decreypter(decoded.data.phone);
			req.user = decoded.data;
			next();
		});
	} else {
		return res.status(403).send({
			error: true,
			message: 'No token provided.',
		});
	}
};

export const extractToken = (req: Request) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}
