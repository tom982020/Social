/** @format */

import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomLink } from '../routes';

export const Layout = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<CustomLink to="/">Home</CustomLink>
					</li>
					<li>
						<CustomLink to="/about">About</CustomLink>
					</li>
				</ul>
			</nav>
			<hr />

			<Outlet />
		</div>
	);
};
