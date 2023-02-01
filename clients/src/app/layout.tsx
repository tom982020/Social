/** @format */
'use client';
import { Box, Center } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import './globals.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
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
			</body>
		</html>
	);
}
