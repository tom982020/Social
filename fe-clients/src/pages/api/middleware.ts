import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const logMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  return handler(req, res);
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello world!' });
}

export default logMiddleware(handler);