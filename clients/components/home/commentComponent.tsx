/** @format */

'use client';

import { AxiosClientAPI } from 'core/AxiosClient';
import useStylespostCard from './styleCard';
import { useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
	Avatar,
	Card,
	Flex,
	Input,
	ScrollArea,
	Transition,
	Text,
	Footer,
} from '@mantine/core';
import { IconMessage2, IconCornerRightUp } from '@tabler/icons';

type ChildProps = {
	// items: Item[];
	idProfile: any;
	idPost: any;
	tagName: any;
	handleComment: (e: React.MouseEvent, formData: any) => void;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const CommentComponent: React.FC<ChildProps> = (props) => {
	const { classes, cx, theme } = useStylespostCard();
	const [active, setActive] = useState(false);
	const [value, setValue] = useState<string>('');
	const [ID, setId] = useState<any[]>([]);
	const isMobile = useMediaQuery('(max-width: 50em)');
	let arr: any = [];

	const handleTagName = (e: any) => {
		setValue(e.currentTarget.value);
		if (value.includes('@')) {
			setActive(true);
			const d = props.tagName.filter((item: any) => {
				const search = value.split('@')[1];
				if (search.toString() != '') {
					return item.idFriend.nickname.toLowerCase() <= search.toLowerCase();
				}
			});
		} else {
			setActive(false);
		}
	};

	const handleGetIDTagName = (id: any, name: string) => {
		setActive(false);
		if (value.search(` ${name}`) == -1) {
			setValue(value.split('@')[0] + ` ${name}`);
			ID.push(id);
			setId(ID);
		} else {
			setValue(value.split('@')[0] + '');
		}
	};

	const handleComment = (e: any) => {
		let formData = {
			postID: props.idPost,
			description: value,
			tagName: ID,
		};
		
		props.handleComment(e, formData);
		setId([]);
		setValue('');
    };
    
    const handleEnter = (e: any) => { 
        let formData = {
			postID: props.idPost,
			description: value,
			tagName: ID,
        };
        if (e.key === 'Enter') {
			props.handleComment(e, formData);
			setId([]);
			setValue('');
		}
    }
	return (
		<>
			<Transition
				mounted={active}
				transition="pop"
				duration={400}
				timingFunction="ease">
				{(styles) => (
					<div style={styles}>
						<Card
							withBorder
							className={classes.tagName}
							display={active ? '' : 'none'}
							radius="md">
							<ScrollArea mah={250}>
								{props.tagName
									? props.tagName.map((item: any, index: number) => {
											return (
												<Flex
													key={index}
													p={'sm'}
													onClick={() =>
														handleGetIDTagName(
															item.idFriend._id,
															item.idFriend.nickname
														)
													}
													w={'100%'}
													direction="row">
													<Avatar
														radius={'xl'}
														src={item.idFriend.avatar.secure_url}
													/>
													<Text
														pl={'sm'}
														pt={'xs'}>
														{item.idFriend.nickname}
													</Text>
												</Flex>
											);
									  })
									: null}
							</ScrollArea>
						</Card>
					</div>
				)}
			</Transition>
			<Footer
				height={60}
				px={40}
				py={10}
				// className={classes.footer}
				p="md">
				<Flex
					w={'100%'}
					direction="column"
					h={'100%'}>
					<Input
						placeholder="Comment..."
						value={value}
						icon={<IconMessage2 />}
						rightSection={
							<IconCornerRightUp
								style={{ cursor: 'pointer' }}
								onClick={(e) => handleComment(e)}
								size="1.6rem"
								color={theme.colors.blue[7]}
								// onClick={handleGetTagName}
							/>
						}
						onChange={(e) => handleTagName(e)}
						onKeyDown={(e) => handleEnter(e)}
						w={'100%'}
					/>
				</Flex>
			</Footer>
		</>
	);
};

export default CommentComponent;
