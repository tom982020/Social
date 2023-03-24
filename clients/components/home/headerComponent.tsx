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
	Switch,
	useMantineColorScheme,
	useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useState } from 'react';
type ChildProps = {
	// items: Item[];
	togglestate: (e: React.MouseEvent, visible: boolean) => void;
	visible: boolean;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const HeaderComponent: React.FC<ChildProps> = (props) => {
	const { classes, cx } = useHomeStyles();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	return (
		<Header height={{ base: 50, md: 70 }}>
			<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
				<MediaQuery
					largerThan="sm"
					styles={{ display: 'none' }}>
					<Burger
						opened={props.visible}
						onClick={(e) => props.togglestate(e,props.visible)}
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
						<Center>
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
						</Center>
					</Grid.Col>
				</Grid>
			</div>
		</Header>
	);
};

export default HeaderComponent;
