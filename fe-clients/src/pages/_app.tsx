/** @format */

import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import {
	Grid,
	NextUIProvider,
	Progress,
	createTheme,
	getDocumentTheme,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { Dna } from 'react-loader-spinner';
import Router, { useRouter } from 'next/router';
import ContentLoader, { Facebook } from 'react-content-loader';
import { Layout } from '../../core/Layout';
import { NavbarComponent } from '../../components/navbar.component';
import SidebarComponent from '../../components/sidbar.component';
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
	const [route, setRoute] = useState<string>('');
	const router = useRouter();
	const currentUrl = router.asPath;

	useEffect(() => {}, []);

	Router.events.on('routeChangeStart', (route) => {
		setVisible(true);
		setRoute(route);
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
				<Layout>
					<div className="relative h-full">
						{currentUrl == '/login' || currentUrl == '/signUp' ? null : (
							<NavbarComponent />
						)}
						<Grid.Container
							justify='center'
						>
							<Grid xl={4}>
								{currentUrl == '/login' || currentUrl == '/signUp' ? null : (
									<SidebarComponent />
								)}
							</Grid>
							<Grid xl={8}>
								<Component {...pageProps} />
							</Grid>
						</Grid.Container>
					</div>
				</Layout>
			</NextUIProvider>
		</NextThemesProvider>
	);
}
