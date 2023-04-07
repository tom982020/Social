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
	AspectRatio,
	Spoiler,
	Modal,
	Paper,
	Flex,
	Footer,
	Input,
	ScrollArea,
	Transition,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
	IconCornerRightUp,
	IconFlag,
	IconHeart,
	IconMessage2,
	IconShare,
	IconUsers,
	IconWorld,
} from '@tabler/icons';
import {
	CommentResponse,
	IPagePostResult,
} from 'constant/interface/IvalidationAccount';
import { useState } from 'react';
import { AxiosClientAPI } from 'core/AxiosClient';
import useStylespostCard from './styleCard';
import CommentComponent from './commentComponent';

type ChildProps = {
	// items: Item[];
	idProfile: any;
	data: IPagePostResult | undefined;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const PostCardComponent: React.FC<ChildProps> = (props) => {
	const { classes, cx, theme } = useStylespostCard();
	const [heart, setHeart] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [modalComment, setmodalComment] = useState(false);
	const [comment, setComment] = useState<any>(null);
	const [tagName, setTagName] = useState<any>(null);
	const [idPost,setIDPost] = useState<any>(null);
	const isMobile = useMediaQuery('(max-width: 50em)');
	let arr: any = []

	const handleGetComment = (id: any) => {
		setmodalComment(true);
		AxiosClientAPI.getDetail('post/comment-user', id, '', false).then(
			(response) => {
				if (response != undefined) {
					setComment(response?.data.result);
				}
			}
		);
		AxiosClientAPI.getDetailPage('profile/list-friend', props.idProfile, 4000, 1).then(
			(response) => {
				if (response != undefined) {
					setTagName(response?.data.result.docs);
				}
			}
		);
		setIDPost(id)
	};

	const handleComment = (formData: any) => {
		AxiosClientAPI.post('post/comment', formData, 'comment success', true).then((response) => {
            if (response) {
                AxiosClientAPI.getDetail('post/comment-user', idPost, '', false).then(
					(response) => {
						if (response != undefined) {
							setComment(response?.data.result);
						}
					}
				);
            }
        })
	}

	return (
		<>
			{props.data != undefined
				? props.data.docs.map((prop, index) => {
						return (
							<div key={index}>
								<Card
									withBorder
									radius="md"
									my={'5%'}
									className={cx(classes.card)}>
									<Card.Section>
										<AspectRatio
											ratio={16 / 9}
											maw={720}>
											<a onClick={open}>
												<Image
													src={prop.image.secure_url}
													sx={{ cursor: 'pointer' }}
												/>
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
											cursor: 'pointer',
										}}>
										{prop.hashTags.map((tag: any, idx: number) => {
											return <Badge key={idx}>#{tag.description}</Badge>;
										})}
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

									<Group position="apart">
										<Center sx={{ cursor: 'pointer' }}>
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
											<ActionIcon
												className={classes.action}
												onClick={() => handleGetComment(prop._id)}>
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
								<Modal
									opened={modalComment}
									onClose={() => setmodalComment(false)}
									size="60%"
									fullScreen={isMobile}
									transitionProps={{
										transition: 'scale',
										duration: 400,
									}}
									style={{
										padding: '30px',
									}}>
									<div style={{ padding: '20px' }}>
										<AspectRatio
											ratio={16 / 9}
											maw={1080}>
											<Image src={prop.image.secure_url} />
										</AspectRatio>
										{comment != undefined && comment.docs.length > 0 ? (
											comment.docs.map((cmt: CommentResponse, i: number) => {
												return (
													<div
														style={{ marginBottom: '20px' }}
														key={i}>
														<Paper
															shadow="sm"
															withBorder
															radius="md"
															className={classes.comment}>
															<Group>
																<Avatar
																	src={cmt.profile.avatar.secure_url}
																	alt={cmt.profile.nickname}
																	radius="xl"
																/>
																<div>
																	<Text fz="sm">{cmt.profile.nickname}</Text>
																	<Text
																		fz="xs"
																		c="dimmed"
																		sx={(theme) => ({
																			color:
																				theme.colorScheme === 'dark'
																					? theme.colors.white
																					: theme.colors.dark[9],
																		})}>
																		{cmt.description}
																	</Text>
																</div>
															</Group>
														</Paper>
														<Flex
															direction={{ base: 'column', sm: 'row' }}
															gap={{ base: 'sm', sm: 'lg' }}
															justify={{ sm: 'left' }}
															sx={{ paddingLeft: '6.5%' }}>
															<Text
																sx={{ cursor: 'pointer' }}
																fz="sm">
																Like
															</Text>
															<Text
																sx={{ cursor: 'pointer' }}
																fz="sm">
																Reply
															</Text>
														</Flex>
													</div>
												);
											})
										) : (
											<Text>No Comment this post</Text>
										)}
										
										<CommentComponent handleComment={(e,formData) => handleComment(formData)} idPost={idPost} idProfile={props.idProfile} tagName={tagName} />
									</div>
								</Modal>
							</div>
						);
				  })
				: null}
		</>
	);
};
export default PostCardComponent;
