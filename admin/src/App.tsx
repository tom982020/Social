/** @format */

import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LayoutComponent } from './page';
import { Home } from './page/home';
import { NoMatch } from './page/errors/page404';
import { AboutComponent } from './page/about';
import { SignInComponent } from './page/signIn';

function App() {
	return (
		<div className="w-full">
			<Routes>
				<Route
					path="/"
					element={<LayoutComponent />}>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="/about"
						element={<AboutComponent />}></Route>
					{/* <Route path="about" element={<About />} /> */}
					<Route
						path="*"
						element={<NoMatch />}
					/>
				</Route>
				<Route
					path="/login"
					element={<SignInComponent />}
				/>
			</Routes>
		</div>
	);
}

export default App;
