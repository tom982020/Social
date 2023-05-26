/** @format */

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import eventEmitter from '@/middleware/emitEvent';
type DataLogin = {
	email: string;
	password: string;
};

// const middleware = (handlerLogin: NextApiHandler) => {
//     return async (req: NextApiRequest, res: NextApiResponse) => {
//         const cookies = parseCookies()
//         await handlerLogin(req, res);
//     };
// };

async function handlerLogin(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST') {
			const url = 'http://18.140.13.114:8080/login';
			const options = {
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: req.body,
				url,
			};

			axios(options)
				.then((response) => {
					setCookie({ res }, 'my-token', response.data.refresh_token, {
						maxAge: 60 * 60 * 60 * 24, // 1 day
						path: '/',
						httpOnly: true,
						secure: process.env.NODE_ENV === 'development',
						sameSite: 'strict',
						// domain: 'localhost:3000',
					});
					const cookies = parseCookies({ req });
					

					res.status(201).json(response.data);
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		}
	} catch (err) {}
}

export default handlerLogin;
