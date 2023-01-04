/** @format */

import axios from 'axios';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export class AxiosService {
	getAll = async (link: string) => {
		try {
			return axios.get(process.env.API_DEV + `${link}`);
		} catch (err) {}
	};

	getById = async (link: string, id: any) => {
		axios
			.get(process.env.API_DEV + `${link}`, { params: { id: id } })
			.then((response) => {
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	getQuery = async (link: string, params: any) => {
		axios
			.get(process.env.API_DEV + `${link}`, { params: params })
			.then((response) => {
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	postData = async (link: string, formdata: any) => {
		axios
			.post(process.env.API_DEV + `${link}`, formdata)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
