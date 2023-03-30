/** @format */

'use client';

import { Avatar, Grid, ScrollArea, Stack, Text } from '@mantine/core';

type ChildProps = {
	data: any;
};

const FriendProfileComponent: React.FC<ChildProps> = (props) => {
	return (
		<ScrollArea sx={{maxHeight: 250}}>
			<Grid>
				{props.data != undefined
					? props.data.map((item: any, index: number) => {
							return (
								<Grid.Col
									key={index}
									span={6}>
									<Grid>
										<Grid.Col span={3}>
											<Avatar
												radius={80}
												src={item.idFriend.avatar.secure_url}
											/>
										</Grid.Col>
										<Grid.Col span={9}>
											<Stack h={'100%'} align="center" justify="center">
												<Text sx={{width: 'fit-content'}}>{item.idFriend.nickname}</Text>
											</Stack>
										</Grid.Col>
									</Grid>
								</Grid.Col>
							);
					  })
					: null}
			</Grid>
		</ScrollArea>
	);
};

export default FriendProfileComponent;
