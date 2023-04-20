/** @format */

import {
	NextApiRequest,
	NextApiResponse,
	GetServerSidePropsContext,
} from 'next';
import nookies, { parseCookies } from 'nookies';
import eventEmitter from './emitEvent';
import NextNodeServer from 'next/dist/server/next-server';

const middleware =
	(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
	async (
		req: NextApiRequest,
		res: NextApiResponse,
		ctx: GetServerSidePropsContext,
		next: () => void
	) => {
		try {
			const cookies = parseCookies({ req });
			if (cookies != undefined) {
				res.setHeader('Set-Cookie', 'my-token=value; Path=/');
				res.status(200).json(cookies);
				next();
			} else {
				return res.status(401).json({ message: 'Unauthorized' });
			}
		} catch (err) {}
	};

export default middleware;
