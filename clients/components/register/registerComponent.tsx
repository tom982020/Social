/** @format */

'use client';
import {
	Box,
	Button,
	Group,
	Modal,
	TextInput,
	Tooltip,
	Text,
	Notification,
	Dialog,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconAlertCircle,
	IconLockOpen,
	IconMail,
	IconPhoneCalling,
	IconUserCheck,
} from '@tabler/icons';
import { IRegister } from 'constant/interface/IvalidationAccount';
import { useState } from 'react';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ChildProps = {
	// items: Item[];
	toggleState: (e: React.MouseEvent, active: number) => void;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const RegisterComponents: React.FC<ChildProps> = (props) => {
	const [opened, handleOpen] = useDisclosure(false);

	const nextStep = () => {
		handleOpen.open();
	};

	const handleSubmit = (e: React.MouseEvent) => {
		handleOpen.open();
		console.log(validate);
		if (
			validate.email == '' &&
			validate.password == '' &&
			validate.username == '' &&
			validate.phone == ''
		) {
			const url = 'http://localhost:8080/authors/create';
			const options = {
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: form.values,
				url,
			};
			axios(options)
				.then((response) => {
					if (response.status === 201) {
						toast.success('create sucessfully', {
							position: toast.POSITION.TOP_RIGHT,
						});
						props.toggleState(e, 1);
					}
				})
				.catch((error) => {
					// console.log(error)
					toast.error('Wrong! ' + error.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
					props.toggleState(e, 0);
				});
		} else {
			toast.error('Input Wrong !', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		handleOpen.close();
	};

	const prevStep = (e: React.MouseEvent) => {
		props.toggleState(e, 0);
	};

	const [validate, setValidate] = useState<IRegister>({
		email: '',
		password: '',
		username: '',
		phone: '',
	});

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			username: '',
			phone: '',
		},

		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? '' : 'Input your email address',
			password: (value) => (value.length > 0 ? '' : 'Input your password'),
			username: (value) => (value.length > 0 ? '' : 'Input your username'),
			phone: (value) => (value.length > 0 ? '' : 'Input your phone number'),
		},
	});

	return (
		<Box sx={{ maxWidth: '65%' }}>
			<form
				onSubmit={form.onSubmit(
					(values, _event) => {
						// setFormValues(values);
					},
					(validationErrors, _values, _event) => {
						setValidate({
							email: validationErrors.email,
							password: validationErrors.password,
							username: validationErrors.username,
							phone: validationErrors.phone,
						});
					}
				)}>
				<TextInput
					withAsterisk
					icon={<IconMail size={16} />}
					label="Email"
					placeholder="your@email.com..."
					{...form.getInputProps('email')}
					rightSection={
						validate.email ? (
							<Tooltip
								label={validate.email}
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
					icon={<IconUserCheck size={16} />}
					label="Username"
					type={'text'}
					placeholder="your username..."
					{...form.getInputProps('username')}
					rightSection={
						validate.username ? (
							<Tooltip
								label={validate.username}
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
					icon={<IconLockOpen size={16} />}
					label="Password"
					type={'password'}
					placeholder="your password..."
					{...form.getInputProps('password')}
					rightSection={
						validate.password ? (
							<Tooltip
								label={validate.password}
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
					icon={<IconPhoneCalling size={16} />}
					label="Phone Number"
					type={'text'}
					placeholder="your phone..."
					{...form.getInputProps('phone')}
					rightSection={
						validate.phone ? (
							<Tooltip
								label={validate.phone}
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

				<Group
					position="center"
					mt="xl">
					<Button
						variant="default"
						onClick={(e) => prevStep(e)}>
						Back
					</Button>
					<Button
						type="submit"
						onClick={nextStep}>
						nextStep
					</Button>
				</Group>
			</form>

			<Modal
				opened={opened}
				onClose={() => handleOpen.close()}
				transition="slide-down"
				transitionDuration={600}
				transitionTimingFunction="ease"
				size="auto"
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
	);
};

export default RegisterComponents;
