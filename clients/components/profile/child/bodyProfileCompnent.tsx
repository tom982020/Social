/** @format */

'use client';

import {
	Card,
	Loader,
	MantineProvider,
	Skeleton,
	Tabs,
	Transition,
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
	const dataPanel = [
		<InformationComponent data={props.profile} />,
		<FriendProfileComponent data={friend} />,
		<PostCardComponent data={post} />,
	];

	const dataList = ['Introduce', 'Friends', 'Post'];

	return (
		<Card
			my={'2%'}
			shadow="xl"
			padding="none"
			radius="md"
			w={isMobile ? '100%' : '40%'}
			withBorder>
			{isMobile ? (
				<Skeleton visible={loading}>
					{loading == false ? (
						<TabCore
							dataLists={dataList}
							dataPanel={
								loading == false
									? dataPanel != undefined
										? dataPanel
										: [<></>, <></>, <></>]
									: undefined
							}
						/>
					) : null}
				</Skeleton>
			) : null}
		</Card>
	);
};

export default BodyProfileComponent;
