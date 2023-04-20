/** @format */

import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';

const handleLogout = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const cookies = parseCookies({ req });
		if (cookies['my-token'] != undefined) {
			setCookie({ res }, 'my-token', '', {
				expires: new Date(0),
				path: '/',
			});
			res.status(200).json('success');
		}
	}
};
export default handleLogout;
