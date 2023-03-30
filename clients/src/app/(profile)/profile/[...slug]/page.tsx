/** @format */
'use client';

import useHomeStyles from '@/app/styleHome';
import {
	Affix,
	AppShell,
	Button,
	Footer,
	rem,
	Transition,
	useMantineTheme,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Inter } from '@next/font/google';
import { IconArrowUp } from '@tabler/icons';
import HeaderComponent from 'components/home/headerComponent';
import NavbarComponent from 'components/home/navbarComponent';
import ProfileCardComponent from 'components/profile/profileComponent';
import SidebarComponent from 'components/home/sidebarComponent';
import {
	IPostResponse,
	IProfileResponse,
} from 'constant/interface/IvalidationAccount';
import { AxiosClientAPI } from 'core/AxiosClient';
import { useEffect, useState } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';

const profileComponent = (req: NextApiRequest, res: NextApiResponse) => {
	const { classes } = useHomeStyles();
	const [scroll, scrollTo] = useWindowScroll();
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [profile, setProfile] = useState<IProfileResponse>();
	const [id, setID] = useState('')

	useEffect(() => {
		AxiosClientAPI.post('login/verify', null, '', false).then((response) => {
			setID(response?.data.decode._id)
			if (response?.data.decode.avatar != undefined) {
				setProfile({
					nickname: response?.data.decode.nickname || '',
					avatar: response?.data.decode.avatar.secure_url,
					DOB: '',
					destination: '',
					BIO: '',
					avatar_saved: response?.data.decode.avatar_saved,
					route: response?.data.decode.route,
					authors:'',
				});
				// setAvatar(response?.data.decode.profile.avatar.secure_url);
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
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
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
					{profile?.route != undefined ? (
						<ProfileCardComponent slug={profile?.route} id={id} />
					) : null}
				</div>
			</AppShell>
		</>
	);
};

export default profileComponent;
