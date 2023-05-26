/** @format */

import {
	Button,
	Card,
	Row,
	Text,
	Col,
	Grid,
	Badge,
	Spacer,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { IPost } from '../dataContants/interface/IPost';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaUserFriends } from "react-icons/fa";

const PostCardComponent = () => {
	const [post, setPost] = useState<IPost | null>(null);

	useEffect(() => {
		const res = fetch(`/api/post/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		res.then(async (data) => {
			if (data.status === 200) {
				const json = await data.json();
				setPost(json.result);
			}
		});
		console.log(post);
	}, []);
	return (
		<>
			<Grid.Container>
				{post != undefined
					? post.docs.map((item) => {
							return (
								<Grid
									xl={12}
									style={{ padding: 25 }}>
									<Card css={{ w: '45%', h: '400px' }}>
										<Card.Header
											css={{ position: 'absolute', zIndex: 1, top: 5 }}>
											<Col>
												<Text
													size={12}
													weight="bold"
													transform="uppercase"
													color="#9E9E9E">
													Your day your way
												</Text>
												<Text
													h3
													color="white">
													Your checklist for better sleep
												</Text>
											</Col>
										</Card.Header>
										<Card.Body css={{ p: 0 }}>
											<Card.Image
												src={
													item.image != undefined ? item.image.secure_url : ''
												}
												objectFit="cover"
												width="100%"
												height="100%"
												alt="Relaxing app background"
											/>
										</Card.Body>
										<Card.Footer
											isBlurred
											css={{
												position: 'absolute',
												bgBlur: '#0f111466',
												borderTop: '$borderWeights$light solid $gray800',
												bottom: 0,
												zIndex: 1,
											}}>
											<Row>
												<Col>
													<Grid.Container
														gap={0}
														justify="flex-start">
														{item.hashTags
															? item.hashTags.map((tag: any, index: number) => {
																	return (
																		<Grid>
																			<Text
																				key={index}
																				style={{ margin: '5px' }}
																				color="#9FD6FF">
																				# {tag.description}
																			</Text>
																		</Grid>
																	);
															  })
															: null}
													</Grid.Container>
													<Row>
														<Col span={3}>
															<Card.Image
																src={
																	item.profile.avatar
																		? item.profile.avatar.secure_url
																		: ''
																}
																css={{ bg: 'black', br: '50%' }}
																height={40}
																width={40}
																alt="Breathing app icon"
															/>
														</Col>
														<Col>
															<Text
																color="#fff"
																size={12}>
																<Grid.Container>
                                                                    <Grid>{item.profile.nickname}</Grid>
                                                                    &nbsp;
                                                                    <Grid>
                                                                        <Spacer y={0.25} />
                                                                        {
                                                                            item.typePost == 'public' ? <AiOutlineGlobal size={12} /> : <FaUserFriends size={12} />
                                                                        }
																		
																	</Grid>
																</Grid.Container>
															</Text>
															<Text
																color="#fff"
																size={12}>
																{item.description}
															</Text>
														</Col>
													</Row>
												</Col>
												<Col style={{ height: '100%', width: '100%' }}>
													<Row
														justify="flex-end"
														align="flex-end"
														style={{ height: '100%', width: '100%' }}>
														<Button
															flat
															auto
															rounded
															css={{ color: '#94f9f0', bg: '#94f9f026' }}>
															<Text
																css={{ color: 'inherit' }}
																size={12}
																weight="bold"
																transform="uppercase">
																Get App
															</Text>
														</Button>
													</Row>
												</Col>
											</Row>
										</Card.Footer>
									</Card>
								</Grid>
							);
					  })
					: null}
			</Grid.Container>
		</>
	);
};

export default PostCardComponent;
