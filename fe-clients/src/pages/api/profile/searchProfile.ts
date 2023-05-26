/** @format */

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

async function handlerSearchProfile(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === 'GET') {
			const cookies = parseCookies({ req });
            if (cookies['my-token'] != undefined) {
				const url = `http://18.140.13.114:8080/profile/search-people?search=${req.query.search}`;
				const options = {
					method: 'GET',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
						Authorization: 'Bearer ' + cookies['my-token'],
					},
					url,
				};

				axios(options)
					.then((response) => {
						res.status(200).json(response.data);
					})
					.catch((err) => {
						res.status(500).json({ error: err });
					});
			}
		}
	} catch (err) {}
}

export default handlerSearchProfile;
