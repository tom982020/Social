/** @format */

import axios from 'axios';
// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();
const axiosClient = axios.create({
	baseURL: 'http://localhost:8080/',
	headers: {
		'Content-type': 'application/json',
	},
	// withCredentials: true,
});

export class AxiosService {
	getAll = async (link: string) => {
		try {
			return axiosClient.get(`${link}`);
		} catch (err) {}
	};

	getById = async (link: string, id: any) => {
		axiosClient
			.get(`${link}`, { params: { id: id } })
			.then((response) => {
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	getQuery = async (link: string, params: any) => {
		axiosClient
			.get(`${link}`, { params: params })
			.then((response) => {
				return response;
			})
			.catch((err) => {
				return err;
			});
	};

	postData = async (link: string, formdata: any) => {
		axiosClient
			.post(`${link}`, formdata)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	putData = async (link: string, id: any, formdata: any) => {
		axiosClient
			.put(`${link}/${id}`, formdata)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	deleteData = async (link: string, id: any) => {
		axiosClient
			.delete(`${link}/${id}`)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};
}
