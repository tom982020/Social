/** @format */

import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import {
	NextUIProvider,
	Progress,
	createTheme,
	getDocumentTheme,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { Dna } from 'react-loader-spinner';
import Router from 'next/router';
import ContentLoader, { Facebook } from 'react-content-loader';
export default function App({ Component, pageProps }: AppProps) {
	const lightTheme = createTheme({
		type: 'light',
		theme: {
			colors: {
				lightTheme: '$white',
			},
		},
	});

	const darkTheme = createTheme({
		type: 'dark',
		theme: {
			colors: {
				darkTheme: '#3f3f3f',
			},
		},
	});

	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {}, []);

	Router.events.on('routeChangeStart', () => {
		setVisible(true);
	});
	Router.events.on('routeChangeComplete', () => setVisible(false));
	Router.events.on('routeChangeError', () => setVisible(false));
	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}>
			<NextUIProvider>
				{visible ? (
					<>
						<Progress
							indeterminated
							size="xs"
							value={40}
							color="secondary"
							status="secondary"
						/>
						<ContentLoader />
					</>
				) : null}

				<Toaster />
				<Component {...pageProps} />
			</NextUIProvider>
		</NextThemesProvider>
	);
}
