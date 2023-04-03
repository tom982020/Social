/** @format */
'use client';
import './globals.scss';
import {
	Box,
	Center,
	LoadingOverlay,
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
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

	return (
		<html lang="en">
			<head />
			<body>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}>
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
								ligth: ['#000000', '#d5d7e0'],
							},
						}}>
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
								style={{ height: '100%' }}>
								<Center style={{ height: '100%' }}>{children}</Center>
							</Box>
						</CookiesProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</body>
		</html>
	);
}
