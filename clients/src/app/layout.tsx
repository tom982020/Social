/** @format */
'use client';
import './globals.scss';
import { Box, Center, LoadingOverlay, MantineProvider } from '@mantine/core';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import router from 'next/router';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isBrowser = () => typeof window !== 'undefined';
	if (isBrowser() && localStorage) {
		// your localStorage code here
		const token = localStorage.getItem('token');
		if (token !== undefined) {
			useEffect(() => {
				const url = 'http://localhost:8080/login/verify';
				const options = {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origi': '*',
						Authorization: 'Bearer ' + token,
						'content-type': 'application/x-www-form-urlencoded',
					},
					url,
				};
				axios(options)
					.then((response) => {
						axios(`http://localhost:8080/profile/${response.data.decode.id}`, {
							method: 'GET',
							headers: {
								'Access-Control-Allow-Origi': '*',
								Authorization: 'Bearer ' + token,
								'content-type': 'application/x-www-form-urlencoded',
							},
						})
							.then((res) => {
								if (res?.data.profile == null) {
									localStorage.setItem(
										'USER',
										JSON.stringify(res?.data.account)
									);
									localStorage.setItem('CHECKPROFILE',res.data.account.exist_Profile)
								} else {
									localStorage.setItem(
										'USER',
										JSON.stringify(res?.data.account)
									);
									localStorage.setItem(
										'PROFILE',
										JSON.stringify(res?.data.profile)
									);
									localStorage.setItem('CHECKPROFILE',res.data.account.exist_Profile)
								}
								if (!res.data.account.exist_Profile) {
									router.push('/register');
								} else {
									router.push('/');
								}
							})
							.catch((err) => {});
					})
					.catch((error) => {});
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
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ loader: 'bars' }}>
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
			</body>
		</html>
	);
}
