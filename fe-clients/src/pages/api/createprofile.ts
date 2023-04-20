/** @format */

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, setCookie } from 'nookies';
import middleware from '../../middleware/checkCookie';
import EventEmitter from 'events';
import eventEmitter from '@/middleware/emitEvent';

async function handlerCreateProfile(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'POST') {
			const cookies = parseCookies({ req });
			if (cookies['my-token'] != undefined) {
				const url = 'http://localhost:8080/profile/create';
				const options = {
					method: 'POST',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
						Authorization: 'Bearer ' + cookies['my-token'],
					},
					data: req.body,
					url,
				};

				axios(options)
					.then((response) => {
						res.status(201).json(response.data);
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			}
		}
	} catch (err) {}
}

export default handlerCreateProfile;
