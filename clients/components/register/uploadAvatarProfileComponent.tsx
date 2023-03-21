/** @format */

'use client';

import { Box, Button, FileInput, Flex, Grid } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { Image } from '@mantine/core';
import { useMantineTheme, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
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
	const [actived, setActive] = useState(0);
	const ref = useRef<HTMLButtonElement>(null);
	const [value, setValue] = useState<File | null>(null);
	const [valueInput, setValueInput] = useState<File | null>(null);
	const [image, setImage] = useSetState({
		created_at: '',
		format: '',
		id: '',
		resource_type: '',
		secure_url: '',
		url: '',
	});
	const theme = useMantineTheme();
	const token = localStorage.getItem('token');
	if (value) {
		setValueInput(value);
		const imageData = new FormData();
		imageData.append('picture', value);
		const url = 'http://localhost:8080/profile/create';
		const options = {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + token,
				'Content-Type': 'multipart/form-data',
			},
			data: imageData,
			url,
		};
		axios(options)
			.then(async (response) => {
				if (response.status === 201) {
					toast.success('create sucessfully', {
						position: toast.POSITION.TOP_RIGHT,
					});
					setImage(response.data.pro.avatar);
					setValue(null);
					// props.togglestate(e, 2, response.data.pro.authors.id, false);
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
	}

	return (
		<div>
			<Box sx={{ maxWidth: '65%' }}>
				<Grid>
					<Grid.Col span={6}>
						<Image
							radius="md"
							maw={360}
							mx="auto"
							src={image?.secure_url}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<FileInput
							label="Upload your avatar"
							placeholder="Your avatar"
							ref={ref}
							value={valueInput}
							onChange={setValue}
							sx={{ Width: '100%' }}
							icon={<IconUpload size={rem(14)} />}
						/>
						<Button
							sx={{float:'right', justifyItems:'end'}}
							variant="light"
							radius="md">
							Save
						</Button>
					</Grid.Col>
				</Grid>
			</Box>
		</div>
	);
};

export default UploadAvatarProfileComponent;
