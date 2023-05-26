/** @format */

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import { Layout } from '../../core/Layout';
import { NavbarComponent } from '../../components/navbar.component';
import PostCardComponent from '../../components/postCard.component';


export default function Home() {
	
	return (
		<>
			<PostCardComponent />
		</>
	);
}
