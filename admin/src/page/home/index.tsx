/** @format */

import { AxiosService } from '../../api/axiosClient';
import React, { useState, useEffect } from 'react';

interface user {
	name: string;
	username: string;
	email: string;
	phone: string;
	hasPassword: string;
	access_token: string;
	refresh_token: string;
	deleted: boolean;
	type: number;
}
interface Array extends user{}

export const Home = () => {
	const [count, setCount] = useState<Array[]>([]);
	const api = new AxiosService();

	useEffect(() => {
		api.getAll('authors').then((response: any) => {
			setCount(response.data.author);
		});
	}, []);
	return (
		<div>
			<h1>Home</h1>
      <h1>{count.map((item) => {
        return (
          <div>
            {item?.username}
            <br />
            {item?.email}
            <br />
            {item?.phone}
            <br />
            {item?.hasPassword}
            <br />
            {item?.access_token}
          </div>
        )
      })}</h1>
		</div>
	);
};
