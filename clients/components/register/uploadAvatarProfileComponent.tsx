/** @format */

'use client';

import {
	Box,
	Button,
	FileInput,
	Grid,
	Progress,
	Title,
	Group,
	Text,
	AspectRatio,
	RingProgress,
	Center,
	ThemeIcon,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { useState } from 'react';
import { Image } from '@mantine/core';
import { rem } from '@mantine/core';
import { IconCheck, IconUpload } from '@tabler/icons';
import { toast } from 'react-toastify';
import axios from 'axios';

type ChildProps = {
	togglestate: (
		e: React.MouseEvent,
		active: number,
		idAcount: string,
		visible: boolean
	) => void;
};

const UploadAvatarProfileComponent: React.FC<ChildProps> = (props) => {
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [valueInput, setValueInput] = useState<File | null>(null);
	const [image, setImage] = useSetState({
		created_at: '',
		format: '',
		id: '',
		resource_type: '',
		secure_url: '',
		url: '',
	});
	const idProfile: any = localStorage.getItem('PROFILE');
	const token = localStorage.getItem('token');
	const uploadImage = (e: any) => {
		let r: any;
		setValueInput(null);
		const imageData = new FormData();
		imageData.append('picture', e);
		const url = 'http://localhost:8080/profile/create';
		const options = {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'multipart/form-data',
			},
			data: imageData,
			url,
			onUploadProgress(progressEvent: any) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 2) / progressEvent.total
				);
				setCount(percentCompleted);
				setDisabled(true);
				if (percentCompleted == 2) {
					let num: number = 0;
					r = setInterval(() => {
						percentCompleted += 1;
						setCount(percentCompleted);
						num = percentCompleted;
						if (num == 98) {
							clearInterval(r);
						}
					}, 80);
				}
			},
			onDownloadProgress(progressEvent: any) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				clearInterval(r);
				setCount(percentCompleted);
				setDisabled(false);
			},
		};
		axios(options)
			.then(async (response) => {
				if (response.status === 201) {
					setImage(response.data.pro.avatar);
					setValueInput(e);
					toast.success('create sucessfully', {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
			})
			.catch((error) => {
				if (error) {
					toast.error('Wrong! ' + error.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
					// props.togglestate(e, 1, '', false);
				}
			});
	};

	const handleSubmit = (e: any) => {
		const url = `http://localhost:8080/profile/avatar-saved/${
			JSON.parse(idProfile)._id
		}`;
		const options = {
			method: 'PATCH',
			headers: {
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + token,
				'Content-Type': 'multipart/form-data',
			},
			url,
		};
		axios(options)
			.then(async (response) => {
				if (response.status === 201) {
					toast.success('sucessfully', {
						position: toast.POSITION.TOP_RIGHT,
					});
					localStorage.setItem('PROFILE', JSON.stringify(response?.data.pro));
					props.togglestate(e, 3, JSON.parse(idProfile).authors._id, false);
				}
			})
			.catch((error) => {
				if (error) {
					toast.error('Wrong! ' + error.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
				}
			});
	};

	return (
		<div>
			<Box sx={{ maxWidth: '65%' }}>
				<Grid>
					<Grid.Col span={6}>
						{count == 100 ? (
							<AspectRatio
								ratio={360 / 360}
								maw={360}
								mx="auto">
								<Image
									radius="xl"
									maw={360}
									mx="auto"
									src={image?.secure_url}
								/>
							</AspectRatio>
						) : count == 0 ? null : (
							<Group position="center">
								<RingProgress
									sections={[{ value: count, color: 'blue' }]}
									label={
										<Text
											color="blue"
											weight={700}
											align="center"
											variant="light"
											size="xl">
											{count == 0 ? null : count + '%'}
										</Text>
									}
								/>
							</Group>
						)}
					</Grid.Col>
					<Grid.Col span={6}>
						<FileInput
							label="Upload your avatar"
							placeholder="Your avatar"
							value={valueInput}
							onChange={(e: any) => uploadImage(e)}
							disabled={disabled}
							sx={{ Width: '100%' }}
							icon={<IconUpload size={rem(14)} />}
						/>
						{count == 0 ? null : (
							<Progress
								sx={{ marginTop: '2px' }}
								value={count}
								animate
								striped
							/>
						)}
					</Grid.Col>
				</Grid>
				{valueInput != null ? (
					<Button
						sx={{ float: 'right', alignItems: 'flex-end' }}
						variant="light"
						radius="md"
						onClick={handleSubmit}>
						Save
					</Button>
				) : null}
			</Box>
		</div>
	);
};

export default UploadAvatarProfileComponent;
