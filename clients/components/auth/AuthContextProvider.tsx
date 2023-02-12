/** @format */
'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContextProvider = () => {
	//  const { access_token, refresh_token } = useGlobalContext();
	let access;
	let refresh: string | null = '';
	useEffect(() => {
		localStorage.setItem('access_token', '');
		localStorage.setItem('refresh_token', '');
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');
		access = access_token;
		refresh = refresh_token;
	}, []);

	if (access || refresh) {
		console.log(access, refresh);
		const url = 'http://localhost:8080/login/verify';
		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			data: access,
			url,
		};
		axios(options)
			.then(async (response) => {
				if (response.data.decode) {
					return {
						redirect: {
						  destination: '/',
						  permanent: false,
						},
					  }
				}
			})
			.catch((err) => {
				if (err.data) {
					const urlRefresh = 'http://localhost:8080/login/verify';
					const optionsRefresh = {
						method: 'POST',
						headers: { 'content-type': 'application/x-www-form-urlencoded' },
						data: refresh,
						urlRefresh,
					};
					axios(optionsRefresh)
						.then(async (response) => {
							if (response.data.decode) {
								return {
									redirect: {
									  destination: '/',
									  permanent: false,
									},
								  }
							}
						})
						.catch((err) => {
							if (err) {
								return {
									redirect: {
									  destination: '/login',
									  permanent: false,
									},
								  }
							}
						});
				}
			});
	} else {
		return {
			redirect: {
			  destination: '/login',
			  permanent: false,
			},
		  }
	}

	return (
		<>
		</>
	);
};
export default AuthContextProvider;
