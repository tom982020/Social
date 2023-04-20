/** @format */

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import { Layout } from '../../core/Layout';
import { NavbarComponent } from '../../components/navbar.component';


export default function Home() {
	
	return (
		<Layout>
			<NavbarComponent />
		</Layout>
	);
}
