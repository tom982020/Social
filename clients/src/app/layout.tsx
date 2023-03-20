/** @format */
'use client';
import './globals.scss';
import { Box, Center, LoadingOverlay, MantineProvider } from '@mantine/core';
import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import AuthContextProvider from 'components/auth/AuthContextProvider';
import { Router } from 'react-router-dom';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
								<Center style={{ height: '90%' }}>{children}</Center>
							</Box>
						</CookiesProvider>
					</Suspense>
				</MantineProvider>
			</body>
		</html>
	);
}
