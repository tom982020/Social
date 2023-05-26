import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

async function handlerVerify(req: NextApiRequest, res: NextApiResponse) {
	try {
        if (req.method === 'POST') {
            const cookies = parseCookies({ req });
            if (cookies['my-token'] != undefined) { 
                const url = 'http://18.140.13.114:8080/login/verify';
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'authorization': 'Bearer ' + cookies['my-token']
                    },
                    url,
                };
    
                axios(options)
                    .then((response) => {
                        res.status(201).json(response.data);
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err });
                    });
            } else {
                res.status(401).json({ error: 'authoriztion' })
            }
			
		}
	} catch (err) {}
}

export default handlerVerify;
