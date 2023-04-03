/** @format */

'use client';

import useHomeStyles from '@/app/styleHome';
import {
	Box,
	Burger,
	Center,
	Grid,
	Header,
	MediaQuery,
	Space,
	Switch,
	Text,
	useMantineColorScheme,
	useMantineTheme,
	Avatar,
	Stack,
	ThemeIcon,
} from '@mantine/core';
import { IconLogin, IconMoonStars, IconPower, IconSun } from '@tabler/icons';
import { IProfileResponse } from 'constant/interface/IvalidationAccount';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
type ChildProps = {
	// items: Item[];
	togglestate: (e: React.MouseEvent, visible: boolean) => void;
	visible: boolean;
	// avatar: string;
	profile: IProfileResponse | undefined;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const HeaderComponent: React.FC<ChildProps> = (props) => {
	const isBrowser = () => typeof window !== 'undefined';
	const { classes, cx } = useHomeStyles();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<Header height={{ base: 50, md: 70 }}>
			<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
				<MediaQuery
					largerThan="sm"
					styles={{ display: 'none' }}>
					<Burger
						opened={props.visible}
						onClick={(e) => props.togglestate(e, props.visible)}
						size="sm"
						color={theme.colors.gray[6]}
						mr="xl"
					/>
				</MediaQuery>
				<Grid
					className={classes.Grid}
					sx={{ width: '100%' }}>
					<Grid.Col span={2}>
						<Box>
							<Center>1</Center>
						</Box>
					</Grid.Col>
					<Grid.Col span={8}>
						<Center>2</Center>
					</Grid.Col>
					<Grid.Col span={2}>
						<Box>
							<Grid>
								<Grid.Col span={6}>
									{props.profile != undefined ? (
										<Center>
											<Stack
												align="center"
												w={'40%'}>
												<Avatar
													src={
														props.profile?.avatar_saved
															? props.profile?.avatar
															: ''
													}
													radius="xl"
												/>
											</Stack>

											<Space h="xl" />
											<Stack
												align="flex-end"
												w={'80%'}>
												<Text>{props.profile?.nickname}</Text>
											</Stack>
										</Center>
									) : (
										<Link
											href={'/login'}
											style={{
												display: 'flex',
												cursor: 'pointer',
												textDecoration: 'none',
												color:
													theme.colorScheme === 'dark'
														? 'white'
														: theme.colors.dark[8],
											}}>
											<Center>
												<Text>
													<ThemeIcon
														variant="light"
														size="xl"
														color="green">
														<IconLogin className={classes.SizeIcon} />
													</ThemeIcon>
												</Text>
											</Center>

											<Space w="xs" />
											<Center>
												<Text>Log In</Text>
											</Center>
										</Link>
									)}
								</Grid.Col>
								<Grid.Col span={6}>
									<Center sx={{ marginTop: '7px' }}>
										<Stack
											align="flex-end"
											w={'100%'}>
											<Switch
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
										</Stack>
									</Center>
								</Grid.Col>
							</Grid>
						</Box>
					</Grid.Col>
				</Grid>
			</div>
		</Header>
	);
};

export default HeaderComponent;
