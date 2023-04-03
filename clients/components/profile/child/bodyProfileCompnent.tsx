/** @format */

'use client';

import {
	Card,
	Grid,
	Loader,
	MantineProvider,
	Skeleton,
	Tabs,
	Transition,
	useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import PostCardComponent from 'components/home/postCardComponent';
import {
	IPagePostResult,
	IProfileRequest,
} from 'constant/interface/IvalidationAccount';
import { AxiosClientAPI } from 'core/AxiosClient';
import TabCore from 'core/TabCore';
import { useEffect, useState } from 'react';
import FriendProfileComponent from './friendProfileComponent';
import InformationComponent from './informationComponent';

type ChildProps = {
	isProfiles: boolean;
	profile: IProfileRequest;
	idProfile: string;
};

const BodyProfileComponent: React.FC<ChildProps> = (props) => {
	const theme = useMantineTheme();
	const [post, setPost] = useState<IPagePostResult>();
	const isMobile = useMediaQuery('(max-width: 50em)');
	const [loading, setLoading] = useState(true);
	const [friend, setFriend] = useState<any>();

	useEffect(() => {
		AxiosClientAPI.getAll('post/post-user', '', false)
			.then((response) => {
				if (response != undefined) {
					setPost(response?.data.result);
				}
			})
			.finally(() => {
				setLoading(false);
			});

		AxiosClientAPI.getDetail(
			'profile/list-friend',
			props.idProfile,
			'',
			false
		).then((response) => {
			if (response != undefined) {
				setFriend(response.data.result.docs);
			}
		});
	}, []);
	const dataPanelMobile = [
		<InformationComponent data={props.profile} />,
		<FriendProfileComponent data={friend} />,
		<PostCardComponent data={post} />,
	];

	const dataListMobile = ['Introduce', 'Friends', 'Post'];

	const dataPanelDesktop = [
		<InformationComponent data={props.profile} />,
		<FriendProfileComponent data={friend} />,
	];

	const dataListDestop = ['Introduce', 'Friends'];
	return (
		<Grid>
			<Grid.Col span={isMobile ? 12 : 5}>
				<Card
					my={ isMobile ? '3%': '7%'}
					shadow="xl"
					padding="none"
					radius="md"
					w={'100%'}
					withBorder>
					{isMobile ? (
						<Skeleton visible={loading}>
							{loading == false ? (
								<TabCore
									dataLists={dataListMobile}
									dataPanel={
										loading == false
											? dataPanelMobile != undefined
												? dataPanelMobile
												: [<></>, <></>, <></>]
											: undefined
									}
								/>
							) : null}
						</Skeleton>
					) : (
						<Skeleton visible={loading}>
							{loading == false ? (
								<TabCore
									dataLists={dataListDestop}
									dataPanel={
										loading == false
											? dataPanelDesktop != undefined
												? dataPanelDesktop
												: [<></>, <></>, <></>]
											: undefined
									}
								/>
							) : null}
						</Skeleton>
					)}
				</Card>
			</Grid.Col>

			<Grid.Col span={isMobile ? 0 : 7}>
				{isMobile ? undefined : <PostCardComponent data={post} />}
			</Grid.Col>
		</Grid>
	);
};

export default BodyProfileComponent;
