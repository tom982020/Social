/** @format */

'use client';
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,
	Center,
	Avatar,
	createStyles,
	rem,
	AspectRatio,
	Spoiler,
	Modal,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
	IconBookmark,
	IconFlag,
	IconHeart,
	IconMessage2,
	IconShare,
	IconUsers,
	IconWorld,
} from '@tabler/icons';
import { IPostResponse } from 'constant/interface/IvalidationAccount';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: rem(12),
		pointerEvents: 'none',
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: rem(5),
	},

	action: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},
	image: {
		[theme.fn.largerThan('md')]: {
			height: '250px',
		},
		[theme.fn.smallerThan('md')]: {
			height: '180px',
		},
	},

	footer: {
		marginTop: theme.spacing.md,
	},
}));

type ChildProps = {
	// items: Item[];
	data: IPostResponse[];
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const PostCardComponent: React.FC<ChildProps> = (props) => {
	const { classes, cx, theme } = useStyles();
	const [heart, setHeart] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const isMobile = useMediaQuery('(max-width: 50em)');
	return (
		<>
			{props.data != undefined
				? props.data.map((prop, index) => {
						return (
							<div key={index}>
								<Card
									withBorder
									radius="md"
									className={cx(classes.card)}>
									<Card.Section>
										<AspectRatio
											ratio={16 / 9}
											maw={720}>
											<a onClick={open}>
												<Image src={prop.image.secure_url} sx={{cursor: 'pointer'}} />
											</a>
										</AspectRatio>
									</Card.Section>

									<Avatar
										className={classes.rating}
										variant="gradient"
										radius="xl"
										size={22}
										gradient={{ from: 'yellow', to: 'red' }}>
										<Center>
											{prop.typePost == 'public' ? (
												<IconWorld size={18} />
											) : (
												<IconUsers fontSize={18} />
											)}
										</Center>
									</Avatar>
									<div
										style={{
											marginTop: '10px',
											cursor: 'pointer'
										}}>
										<Badge>#Badge</Badge>
									</div>
									<Text
										className={classes.title}
										fw={500}
										component="a"
										fz="lg">
										{prop.title}
									</Text>

									<Spoiler
										maxHeight={70}
										showLabel="Show more"
										hideLabel="Hide">
										<Text
											fz="md"
											color="dimmed">
											{prop.description}
										</Text>
									</Spoiler>

									<Group
										position="apart"
										className={classes.footer}>
										<Center sx={{cursor: 'pointer'}}>
											<Avatar
												src={prop.profile.avatar.secure_url}
												size={28}
												radius="xl"
												mr="xs"
											/>
											<Text
												fz="md"
												inline>
												{prop.profile.nickname}
											</Text>
										</Center>

										<Group
											spacing={8}
											mr={0}>
											<ActionIcon
												className={classes.action}
												onClick={() => setHeart(!heart)}>
												<IconHeart
													size="1rem"
													fill={heart == true ? 'red' : 'none'}
													color={theme.colors.red[6]}
												/>
											</ActionIcon>
											<ActionIcon className={classes.action}>
												<IconMessage2
													size="1rem"
													color={theme.colors.blue[7]}
												/>
											</ActionIcon>
											<ActionIcon className={classes.action}>
												<IconFlag
													size="1rem"
													color={theme.colors.yellow[7]}
												/>
											</ActionIcon>

											<ActionIcon className={classes.action}>
												<IconShare size="1rem" />
											</ActionIcon>
										</Group>
									</Group>
								</Card>
								<Modal
									opened={opened}
									onClose={close}
									size="60%"
									fullScreen={isMobile}
									transitionProps={{ transition: 'scale', duration: 400 }}>
									<AspectRatio
										ratio={16 / 9}
										maw={1080}>
										<Image src={prop.image.secure_url} />
									</AspectRatio>
								</Modal>
							</div>
						);
				  })
				: null}
		</>
	);
};
export default PostCardComponent;
