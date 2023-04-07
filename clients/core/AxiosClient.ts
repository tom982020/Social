/** @format */

import axios from 'axios';
import { toast } from 'react-toastify';

const URL_LOCAL = 'http://18.140.13.114:8080/';

const getAll = (url: string, mess: string | null, nonfication: boolean) => {
	const token = localStorage.getItem('token');
	const URL = URL_LOCAL + url + '/';
	const res = axios({
		method: 'get',
		url: URL,
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => {
			if (nonfication == true) {
				toast.success(`${mess} sucessfully`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
			return response;
		})
		.catch((error) => {
			toast.error('Wrong! ' + error, {
				position: toast.POSITION.TOP_CENTER,
			});
		});
	return res;
};

const getDetail = (
	url: string,
	id: any,
	mess: string | null,
	nonfication: boolean
) => {
	const token = localStorage.getItem('token');
	const URL = URL_LOCAL + url + '/' + id;
	const res = axios({
		method: 'get',
		url: URL,
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => {
			if (nonfication == true) {
				toast.success(`${mess} sucessfully`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
			return response;
		})
		.catch((error) => {
			toast.error('Wrong! ' + error, {
				position: toast.POSITION.TOP_CENTER,
			});
		});
	return res;
};

const getDetailPage = (url: string, id: any, limit: number, page: number) => {
	const token = localStorage.getItem('token');
	const URL = URL_LOCAL + url + '/' + id + `?limit=${limit}&page=${page}`;
	const res = axios({
		method: 'get',
		url: URL,
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
		.then((response) => {
			return response;
		})
		.catch((error) => {});
	return res;
};

const post = (
	url: string,
	formData: any,
	mess: string | null,
	nonfication: boolean
) => {
	const token = localStorage.getItem('token');
	const Url = URL_LOCAL + url;
	const res = axios({
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + token,
			'content-type': 'application/x-www-form-urlencoded',
		},
		data: formData,
		url: Url,
	})
		.then((response) => {
			if (nonfication == true) {
				toast.success(`${mess} sucessfully`, {
					position: toast.POSITION.TOP_RIGHT,
				});
			}

			return response;
		})
		.catch((error) => {
			toast.error('Wrong! ' + error.message, {
				position: toast.POSITION.TOP_RIGHT,
			});
		});
	return res;
};

export const AxiosClientAPI = {
	getDetail: getDetail,
	post: post,
    getAll: getAll,
    getDetailPage:getDetailPage,
};
