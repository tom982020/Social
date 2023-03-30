/** @format */

'use client';
import {
	Card,
	createStyles,
	rem,
	Image,
	AspectRatio,
	Avatar,
	Overlay,
	Grid,
	Text,
	Box,
	Center,
	Stack,
	Flex,
	Rating,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
	IconArticle,
	IconFlag,
	IconMapPin,
	IconMapPins,
	IconPlus,
} from '@tabler/icons';
import {
	IPostResponse,
	IProfileRequest,
	IProfileResponse,
} from 'constant/interface/IvalidationAccount';
import { AxiosClientAPI } from 'core/AxiosClient';
import ButtonCore from 'core/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import background from '../../public/background.jpeg';
import BodyProfileComponent from './child/bodyProfileCompnent';

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

	avatar: {
		border: `${rem(2)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
		}`,
	},
}));

type ChildProps = {
	// items: Item[];
	slug: string;
	id: string;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const ProfileCardComponent: React.FC<ChildProps> = (props) => {
	const { classes, theme } = useStyles();
	const isMobile = useMediaQuery('(max-width: 50em)');
	const [profile, setProfile] = useState<IProfileRequest | any>();
	const [idProfile, setIdProfile] = useState('');
	useEffect(() => {
		AxiosClientAPI.getDetail('profile/view', props.slug, '', false).then(
			(response) => {
				setIdProfile(response?.data.profile.id);
				if (response?.data.profile.avatar != undefined) {
					setProfile({
						nickname: response?.data.profile.nickname || '',
						avatar: response?.data.profile.avatar.secure_url,
						DOB: response?.data.profile.DOB,
						destination: response?.data.profile.destination,
						BIO: response?.data.profile.BIO,
						avatar_saved: response?.data.profile.avatar_saved,
						route: response?.data.profile.route,
						rank: 0,
						evaluate: response?.data.profile.evaluate,
						authors: response?.data.profile.authors,
						follow: response?.data.profile.followNumber,
					});
				}
			}
		);
	}, []);

	return (
		<>
			<Card
				shadow="xl"
				padding="none"
				radius="md"
				withBorder>
				<AspectRatio
					ratio={16 / 9}
					maw={1080}>
					<Image src={background.src} />
					<Overlay
						zIndex={98}
						color="#000"
						opacity={0.4}
					/>
				</AspectRatio>
				<Grid>
					<Grid.Col span={isMobile ? 12 : 2}>
						<Avatar
							src={profile?.avatar}
							size={isMobile ? 70 : 120}
							radius={80}
							sx={{
								zIndex: 99,
							}}
							ml={isMobile ? undefined : '10%'}
							mx={isMobile ? 'auto' : undefined}
							mt={isMobile ? -30 : -55}
							className={classes.avatar}
						/>
						<Center mx={isMobile ? 'auto' : undefined}>
							<Rating
								defaultValue={profile?.evaluate}
								fractions={2}
								readOnly={true}
							/>
						</Center>
					</Grid.Col>
					<Grid.Col span={isMobile ? 0 : 10}>
						<Grid py={isMobile ? 10 : 0}>
							<Grid.Col span={isMobile ? 4 : 1}>
								<Stack
									align="flex-end"
									justify="flex-end"
									h={'100%'}
									w={'100%'}
									spacing="xs"
									pb={3}>
									<IconMapPin
										color="gray"
										size={isMobile ? 10 : 20}
									/>
									<IconArticle
										color="gray"
										size={isMobile ? 10 : 20}
									/>
								</Stack>
							</Grid.Col>
							<Grid.Col span={isMobile ? 8 : 6}>
								<Box mx={isMobile ? 'auto' : undefined}>
									<Text
										variant="gradient"
										gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
										sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
										fz={isMobile ? 'md' : 'xl'}
										fw={700}>
										{profile?.nickname}
									</Text>

									<Text
										sx={(theme) => ({
											fontFamily: 'Greycliff CF, sans-serif',
											color:
												theme.colorScheme === 'dark'
													? theme.colors.white
													: theme.colors.gray[6],
										})}
										fz={isMobile ? 'xs' : 'lg'}
										fw={200}>
										{profile?.destination}
									</Text>

									<Text
										sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
										fz={isMobile ? 'xs' : 'lg'}
										fw={200}>
										{profile?.BIO}
									</Text>
								</Box>
							</Grid.Col>
							{props.id == idProfile ? null : (
								<Grid.Col span={isMobile ? 0 : 5}>
									<Box py={isMobile ? '2%' : '10%'}>
										<Flex
											direction={{
												base: isMobile ? 'row' : 'column',
												sm: 'row',
											}}
											gap={{ base: isMobile ? 'lg' : 'sm', sm: 'lg' }}
											justify={{ base: 'center', sm: 'center' }}>
											<ButtonCore
												icon={<IconPlus />}
												text="Add friend"
												size="md"
												color=""
											/>
											<ButtonCore
												icon={<IconFlag />}
												text="Report"
												size="md"
												color="red"
											/>
										</Flex>
									</Box>
								</Grid.Col>
							)}
						</Grid>
					</Grid.Col>
				</Grid>
			</Card>
			<BodyProfileComponent
				idProfile={props.id}
				isProfiles={idProfile == props.id ? true : false}
				profile={profile != undefined ? profile : undefined}
			/>
		</>
	);
};
export default ProfileCardComponent;
