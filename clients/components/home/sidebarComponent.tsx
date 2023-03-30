/** @format */
'use client';

import {
	Aside,
	MediaQuery,
	Modal,
	NavLink,
	Image,
	useMantineTheme,
	Box,
	AspectRatio,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { dataUserNav } from 'constant/data/navbar';
import { useState } from 'react';
import background from '../../public/background.jpeg';

const SidebarComponent = () => {
	const theme = useMantineTheme();
	const [active, setActive] = useState(0);
	const [activeChild, setActiveChild] = useState(0);
	const [opened, handle] = useDisclosure(false);
	const isMobile = useMediaQuery('(max-width: 50em)');

	const handleSubmit = (name: string) => {
		if (name == 'Profile') {
			if (!(typeof window === undefined)) {
				const profile: any = localStorage.getItem('PROFILE');
				const route = JSON.parse(profile).route;
				window.history.pushState(null, '', `http://localhost:3000/profile/` + route);
				window.location.reload();
			}
		}
	};

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
				onClick={() => {
					setActive(index);
					handleSubmit(item.label);
				}}>
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
		<>
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
			<Modal
				opened={opened}
				onClose={() => handle.close()}
				fullScreen={isMobile}
				withCloseButton={false}
				closeOnClickOutside={false}
				size="60%"
				transitionProps={{ transition: 'scale', duration: 400 }}>
				<Box>
					<AspectRatio
						ratio={16 / 9}
						maw={1080}>
						<Image src={background.src} />
					</AspectRatio>
				</Box>
			</Modal>
		</>
	);
};

export default SidebarComponent;
