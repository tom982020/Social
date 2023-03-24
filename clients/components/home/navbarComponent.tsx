/** @format */
'use client';

import useHomeStyles from '@/app/styleHome';
import {
	Navbar,
	Switch,
	useMantineColorScheme,
	useMantineTheme,
	Stack,
	ThemeIcon,
	NavLink,
	Grid,
	Text,
	Space,
	Center,
	Tabs,
	Transition,
} from '@mantine/core';
import {
	IconMoonStars,
	IconPower,
	IconSettings,
	IconSun,
	IconUser,
} from '@tabler/icons';
import { dataNavbar, dataUserNav } from 'constant/data/navbar';
import { useState } from 'react';
type ChildProps = {
	visible: boolean;
};

const scaleY = {
	in: { opacity: 1, transform: 'scaleY(1)' },
	out: { opacity: 1, transform: 'scaleY(0)' },
	common: { transformOrigin: 'top' },
	transitionProperty: 'transform, opacity',
};

const NavbarComponent: React.FC<ChildProps> = (props) => {
	const { classes } = useHomeStyles();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();
	const [active, setActive] = useState(0);
	const [activeChild, setActiveChild] = useState(0);
	const [opened, setOpened] = useState(true);
	const [opened1, setOpened1] = useState(false);

	const itemsSystem = dataNavbar.map((item, index) => {
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
		<Navbar
			p="md"
			hiddenBreakpoint="sm"
			withBorder={true}
			style={{
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[8]
						: theme.colors.gray[0],
			}}
			color=""
			hidden={!props.visible}
			width={{ sm: 200, lg: 300 }}
			height={'100%'}>
			<Navbar.Section grow>
				<Tabs
					className={classes.Tab}
					color="green"
					defaultValue="gallery">
					<Tabs.List>
						<Tabs.Tab
							value="gallery"
							key={1}
							onClick={() => {
								setOpened(true)
								setOpened1(false)
							}}
							icon={<IconSettings size="0.8rem" />}>
							System
						</Tabs.Tab>
						<Tabs.Tab
							value="messages"
							key={2}
							onClick={() => {
								setOpened(false)
								setOpened1(true)
							}}
							icon={<IconUser size="0.8rem" />}>
							Account
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel
						value="gallery"
						pt="xs">
						<Transition
							mounted={opened}
							transition="slide-right"
							duration={400}
							timingFunction="ease">
							{(styles) => <div style={styles}>{itemsSystem}</div>}
						</Transition>
					</Tabs.Panel>

					<Tabs.Panel
						value="messages"
						pt="xs">
						<Transition
							mounted={opened1}
							transition="slide-right"
							duration={400}
							timingFunction="ease">
							{(styles) => <div style={styles}>{itemsUser}</div>}
						</Transition>
					</Tabs.Panel>
				</Tabs>

				<div className={classes.TabDesktop}>{itemsSystem}</div>
			</Navbar.Section>
			<div className={classes.footerNav}>
				<Grid>
					<Grid.Col span={6}>
						<Switch
							className={classes.SwitchColor}
							checked={colorScheme === 'dark'}
							onChange={() => toggleColorScheme()}
							size="lg"
							onLabel={
								<IconSun
									color={theme.white}
									size="1.25rem"
									stroke={1.5}
								/>
							}
							offLabel={
								<IconMoonStars
									color={theme.colors.gray[6]}
									size="1.25rem"
									stroke={1.5}
								/>
							}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Stack
							align="flex-end"
							justify="center"
							h={'100%'}
							sx={(theme) => ({
								backgroundColor:
									theme.colorScheme === 'dark'
										? theme.colors.dark[8]
										: theme.colors.gray[0],
							})}>
							<div style={{ display: 'flex' }}>
								<Center>
									<Text>
										<ThemeIcon
											variant="light"
											size="xl"
											color="red">
											<IconPower className={classes.SizeIcon} />
										</ThemeIcon>
									</Text>
								</Center>

								<Space w="xs" />
								<Center>
									<Text>Sign Out</Text>
								</Center>
							</div>
						</Stack>
					</Grid.Col>
				</Grid>
			</div>
		</Navbar>
	);
};
export default NavbarComponent;
