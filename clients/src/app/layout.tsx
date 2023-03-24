/** @format */
'use client';
import './globals.scss';
import { Box, Center, LoadingOverlay, MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Suspense, useEffect, useState } from 'react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import router from 'next/router';
import { Router } from 'react-router-dom';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isBrowser = () => typeof window !== 'undefined';
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	  });
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
		useHotkeys([['mod+J', () => toggleColorScheme()]]);
	if (isBrowser() && localStorage) {
		// your localStorage code here
		const token = localStorage.getItem('token');
		if (token !== null) {
			useEffect(() => {
				const url = 'http://localhost:8080/login/verify';
				const options = {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'content-type': 'application/x-www-form-urlencoded',
						Authorization: 'Bearer ' + token,
					},
					url,
				};
				axios(options)
					.then((response) => {
							axios(
								`http://localhost:8080/profile/${response.data.decode.id}`,
								{
									method: 'GET',
									headers: {
										'Access-Control-Allow-Origi': '*',
										Authorization: 'Bearer ' + token,
										'content-type': 'application/x-www-form-urlencoded',
									},
								}
							)
								.then((res) => {
									if (res?.data.profile == null) {
										localStorage.setItem(
											'USER',
											JSON.stringify(res?.data.account)
										);
										localStorage.setItem(
											'CHECKPROFILE',
											res.data.account.exist_Profile
										);
									} else {
										localStorage.setItem(
											'USER',
											JSON.stringify(res?.data.account)
										);
										localStorage.setItem(
											'PROFILE',
											JSON.stringify(res?.data.profile)
										);
										localStorage.setItem(
											'CHECKPROFILE',
											res.data.account.exist_Profile
										);
									}
									if (!res.data.account.exist_Profile) {
										router.push('/register');
									} else {
										router.push('/');
									}
								})
								.catch((err) => {});
					})
					.catch((error) => {
						if (error.response.status === 401) {
							
						 }
					});
			}, []);
		} else {
			localStorage.removeItem('token');
			localStorage.removeItem('USER');
		}
	}

	return (
		<html lang="en">
			<head />
			<body>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						loader: 'bars',
						colorScheme: colorScheme,
						colors: {
							// override dark colors to change them for all components
							dark: [
							  '#d5d7e0',
							  '#acaebf',
							  '#8c8fa3',
							  '#666980',
							  '#4d4f66',
							  '#34354a',
							  '#2b2c3d',
							  '#1d1e30',
							  '#0c0d21',
							  '#01010a',
							],
							ligth: [
								'#000000'
							]
						  },
					}}>
					<Suspense
						fallback={
							<LoadingOverlay
								loaderProps={{ size: 'xl', color: 'cyan', variant: 'bars' }}
								overlayOpacity={0.4}
								overlayColor="#c5c5c5"
								overlayBlur={3}
								visible
							/>
						}>
						<ToastContainer
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
						<CookiesProvider>
							<Box
								sx={(theme) => ({
									backgroundColor:
										theme.colorScheme === 'dark'
											? theme.colors.dark[6]
											: theme.colors.gray[0],
									// color:
									// 	theme.colorScheme === 'dark'
									// 		? theme.colors.blue[4]
									// 		: theme.colors.blue[7],
									// textAlign: 'center',
									padding: theme.spacing.xl,
								})}
								style={{ height: '1000px' }}>
								<Center style={{ height: '100%' }}>{children}</Center>
							</Box>
						</CookiesProvider>
					</Suspense>
				</MantineProvider>
			</ColorSchemeProvider>
				
			</body>
		</html>
	);
}
