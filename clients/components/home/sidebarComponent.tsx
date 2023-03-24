/** @format */
'use client';

import { Aside, MediaQuery, NavLink, Text, useMantineTheme } from '@mantine/core';
import { dataUserNav } from 'constant/data/navbar';
import { useState } from 'react';

const SidebarComponent = () => {
	const theme = useMantineTheme();
	const [active, setActive] = useState(0);
	const [activeChild, setActiveChild] = useState(0);
	
	const itemsUser = dataUserNav.map((item, index) => {
		return (
			<NavLink
				key={item.label}
				active={index === active}
				label={item.label}
				icon={
					<item.icon
						size="1rem"
						stroke={1.5}
					/>
				}
				childrenOffset="xl"
				variant="filled"
				style={{
					fontSize: '20px',
				}}
				onClick={() => setActive(index)}>
				{item.child?.map((child, idx) => (
					<NavLink
						key={child.label}
						label={child.label}
						active={idx === activeChild}
						onClick={() => {
							setActiveChild(idx);
						}}
					/>
				))}
			</NavLink>
		);
	});
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
				{itemsUser}
			</Aside>
		</MediaQuery>
	);
};

export default SidebarComponent;
