/** @format */

import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './page';
import { Home } from './page/home';
import { NoMatch } from './page/errors/page404';

function App() {
	return (
		<div className="App">
			<h1>Custom Link Example</h1>

			<p>
				This example demonstrates how to create a custom{' '}
				<code>&lt;Link&gt;</code> component that knows whether or not it is
				"active" using the low-level <code>useResolvedPath()</code> and{' '}
				<code>useMatch()</code> hooks.
			</p>
			<Routes>
				<Route
					path="/"
					element={<Layout />}>
					<Route
						index
						element={<Home />}
					/> 
					{/* <Route path="about" element={<About />} /> */}
					 <Route
						path="*"
						element={<NoMatch />}
					/>
				</Route>
			</Routes> 
		</div>
	);
}

export default App;
