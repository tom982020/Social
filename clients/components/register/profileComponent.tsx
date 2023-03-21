/** @format */

'use client';
import {
	Box,
	TextInput,
	Tooltip,
	Textarea,
	Text,
	Group,
	Button,
	Modal,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconAlertCircle,
	IconCalendarTime,
	IconMapPins,
	IconNews,
	IconSignature,
} from '@tabler/icons';
import { IProfile } from 'constant/interface/IvalidationAccount';
import { useState } from 'react';
import 'dayjs/locale/vi';
import { DateInput, DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

type ChildProps = {
	// items: Item[];
	togglestate: (e: React.MouseEvent, active: number, idAcount: string,visible:boolean) => void;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const ProfileComponent: React.FC<ChildProps> = (props) => {
	const [actived, setActive] = useState(0);
	const [opened, handleOpen] = useDisclosure(false);
	const [validate, setValidate] = useState<IProfile>({
		nickname: '',
		DOB: '',
		BIO: '',
		destination: '',
	});

	const form = useForm({
		initialValues: {
			nickname: '',
			DOB: '',
			BIO: '',
			destination: '',
		},

		validate: {
			// nickname: (value) =>
			// value.length > 0 ? '' : 'Input your nickname',
			DOB: (value) => (value.length > 0 ? '' : 'Input your password'),
			// BIO: (value) => (/${0-9}/.test(value) ? '' : 'Input your username'),
			destination: (value) =>
				value.length > 0 ? '' : 'Input your phone number',
		},
	});

	const nextStep = () => {
		handleOpen.open();
	};

	const token = localStorage.getItem('token');

	const handleSubmit = (e: React.MouseEvent) => {
		handleOpen.open();
		props.togglestate(e, 1, '', false);
		if (
			validate.DOB == '' ||
			validate.destination == ''
		) {
			const formData = {
				nickname: form.values.nickname,
			DOB: form.values.DOB.toString(),
			BIO: form.values.BIO,
			destination: form.values.destination,
			}

			const url = 'http://localhost:8080/profile/create';
			const options = {
				method: 'POST',
				headers: {
					"Access-Control-Allow-Origi": "*",
					Authorization: "Bearer " + token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: formData,
				url,
			};
			axios(options)
				.then((response) => {
					if (response.status === 201) {
						toast.success('create sucessfully', {
							position: toast.POSITION.TOP_RIGHT,
						});
						props.togglestate(e, 2, response.data.pro.authors.id, false);
						localStorage.setItem('CHECKPROFILE',response.data.checkUser.exist_Profile)
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error('Wrong! ' + error.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
					props.togglestate(e, 1, '',false);
				});
		} else {
			toast.error('Input Wrong !', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		handleOpen.close();
	};

	const prevStep = (e: React.MouseEvent) => {
		setActive(0);
		props.togglestate(e, 0,'',false);
	};


	
	return (
		<div>
<Box sx={{ maxWidth: '65%' }}>
			<form
				onSubmit={form.onSubmit(
					(values, _event) => {
						// setFormValues(values);
					},
					(validationErrors, _values, _event) => {
						setValidate({
							nickname: '',
							DOB: validationErrors.DOB ? validationErrors.DOB.toString() : '',
							BIO: '',
							destination: validationErrors.destination
								? validationErrors.destination.toString()
								: '',
						});
					}
				)}>
				<TextInput
					withAsterisk
					icon={<IconSignature size={16} />}
					label="Nick name"
					placeholder="nickname..."
					type={'text'}
					{...form.getInputProps('nickname')}
					rightSection={
						validate.nickname ? (
							<Tooltip
								label={validate.nickname}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>
				<Textarea
					withAsterisk
					icon={<IconNews size={16} />}
					label="BIO"
					autosize
					minRows={1.5}
					maxRows={2}
					placeholder="your BIO..."
					{...form.getInputProps('BIO')}
					rightSection={
						validate.BIO ? (
							<Tooltip
								label={validate.BIO}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>

				<TextInput
					withAsterisk
					type={'text'}
					icon={<IconMapPins size={16} />}
					label="Destination"
					placeholder="your destination..."
					{...form.getInputProps('destination')}
					rightSection={
						validate.destination ? (
							<Tooltip
								label={validate.destination}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>

				<DateInput
					locale="vi"
					icon={<IconCalendarTime size={16} />}
					placeholder="Pick a date"
					label="DOB"
					withAsterisk
					defaultValue={new Date()}
					{...form.getInputProps('DOB')}
				/>
			</form>

			<Group
				position="center"
				mt="xl">
				{actived ? (
					<Button
						variant="default"
						onClick={(e) => prevStep(e)}>
						Back
					</Button>
				) : (
					''
				)}
				<Button onClick={nextStep}>nextStep</Button>
			</Group>

			<Modal
				opened={opened}
				onClose={() => handleOpen.close()}
				size="auto"
				transitionProps={{ transition: 'fade', duration: 300, timingFunction: 'linear' }}
				centered>
				<Text mx="auto">Are your sure create ?</Text>

				<Group
					mt="xl"
					position="right">
					<Button
						variant="light"
						color="teal"
						onClick={(e) => handleSubmit(e)}>
						Submit
					</Button>
					<Button
						variant="light"
						color="red"
						onClick={() => handleOpen.close()}>
						Cancel
					</Button>
				</Group>
			</Modal>
		</Box>
		</div>
		
	);
};
export default ProfileComponent;
