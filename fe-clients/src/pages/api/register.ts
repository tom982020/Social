import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

async function handlerRegister(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const url = 'http://18.140.13.114:8080/authors/create';
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: req.body,
                url,
            };

            axios(options)
                .then((response) => {
                    
                    // setCookie({ res }, 'my-token', response.data.refresh_token, {
                    //     maxAge: 60 * 60 * 24, // 1 day
                    //     path:'/',
                    //     httpOnly: true,
                    //     secure: process.env.NODE_ENV === 'development',
                    //     sameSite: 'strict',
                    // });

                    res.status(201).json(response.data);
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
        }
    } catch (err) { }
}

export default handlerRegister