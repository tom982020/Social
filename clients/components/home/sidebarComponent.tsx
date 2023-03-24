/** @format */
'use client';

import { Aside, MediaQuery, Text, useMantineTheme } from '@mantine/core';

const SidebarComponent = () => {
	const theme = useMantineTheme();

	return (
		<MediaQuery
			smallerThan="sm"
			styles={{ display: 'none' }}>
			<Aside
				p="md"
				hiddenBreakpoint="sm"
				width={{ sm: 200, lg: 300 }}
				height={'100%'}
				style={{
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				}}>
				<Text>Application sidebar</Text>
			</Aside>
		</MediaQuery>
	);
};

export default SidebarComponent;
