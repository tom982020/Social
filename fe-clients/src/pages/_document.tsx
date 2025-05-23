/** @format */

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import React from 'react';


class MyDocument extends Document {
	// static async getInitialProps(ctx) {
	//   const initialProps = await Document.getInitialProps(ctx);
	//   return {
	//     ...initialProps,
	//     styles: React.Children.toArray([initialProps.styles])
	//   };
	// }

	render() {
		return (
			<Html lang="en">
				<Head></Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
