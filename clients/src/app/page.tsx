/** @format */
'use client';

import * as google from '@next/font/google';
import useHomeStyles from './styleHome';
import { useEffect, useState } from 'react';
import {
	Affix,
	useMantineColorScheme,
	rem,
	Transition,
	Button,
	AppShell,
	Footer,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { IconArrowUp } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import NavbarComponent from 'components/home/navbarComponent';
import HeaderComponent from 'components/home/headerComponent';
import SidebarComponent from 'components/home/sidebarComponent';
import { AxiosClientAPI } from 'core/AxiosClient';
import {
	IPostResponse,
	IProfileResponse,
} from 'constant/interface/IvalidationAccount';
import PostCardComponent from 'components/home/postCardComponent';

export default function Home() {
	const { classes } = useHomeStyles();
	// const { colorScheme } = useMantineColorScheme();
	const [scroll, scrollTo] = useWindowScroll();
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	// const [avatar, setAvatar] = useState<any>(null);
	const [profile, setProfile] = useState<IProfileResponse | any>();
	const [postCard, setPost] = useState<IPostResponse[] | any>();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token != undefined) {
			AxiosClientAPI.post('login/verify', null, '', false).then((response) => {
				if (response != undefined) {
					if (response?.data.decode.avatar != undefined) {
						setProfile({
							nickname: response.data.decode.nickname || '',
							avatar: response.data.decode.avatar.secure_url,
							DOB: '',
							destination: '',
							BIO: '',
							avatar_saved: response.data.decode.avatar_saved,
						});
						// setAvatar(response?.data.decode.profile.avatar.secure_url);
					}
				}
			});
		}

		AxiosClientAPI.getAll('post/all', null, false).then((response) => {
			if (response != undefined) {
				setPost(response?.data.result);
			}
		});
	}, []);
	return (
		<>
			<Affix position={{ bottom: rem(20), right: rem(20) }}>
				<Transition
					transition="slide-up"
					mounted={scroll.y > 0}>
					{(transitionStyles) => (
						<Button
							leftIcon={<IconArrowUp size="1rem" />}
							style={transitionStyles}
							onClick={() => scrollTo({ y: 0 })}>
							Scroll to top
						</Button>
					)}
				</Transition>
			</Affix>
			<AppShell
				styles={{
					main: {
						background:
							theme.colorScheme === 'dark'
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				}}
				navbarOffsetBreakpoint="md"
				asideOffsetBreakpoint="md"
				navbar={<NavbarComponent visible={opened} />}
				aside={<SidebarComponent />}
				footer={
					<Footer
						height={60}
						className={classes.footer}
						p="md">
						Application footer
					</Footer>
				}
				header={
					<HeaderComponent
						visible={opened}
						profile={profile}
						togglestate={(e, visible) => {
							setOpened(!visible);
						}}
					/>
				}>
				<div className={classes.cardPost}>
					<PostCardComponent data={postCard} />
				</div>
			</AppShell>
		</>
	);
}
