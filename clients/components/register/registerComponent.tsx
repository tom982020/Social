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
	useMantineTheme,
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
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosClientAPI } from 'core/AxiosClient';
import Link from 'next/link';

type ChildProps = {
	togglestate: (
		e: React.MouseEvent,
		active: number,
		idAcount: string,
		visible: boolean
	) => void;
};

const RegisterComponents: React.FC<ChildProps> = (props) => {
	const [opened, handleOpen] = useDisclosure(false);
	const theme = useMantineTheme();

	const [visible, setVisible] = useState(false);
	const nextStep = () => {
		setVisible(false);
		handleOpen.open();
	};

	const handleSubmit = (e: React.MouseEvent) => {
		handleOpen.open();
		props.togglestate(e, 0, '', true);
		if (
			validate.email == '' &&
			validate.password == '' &&
			validate.username == '' &&
			validate.phone == ''
		) {
			const createAccount = AxiosClientAPI.post(
				'authors/create',
				form.values,
				'Create Account',
				true
			);
			createAccount.then((response) => {
				const urlLogin = 'login';
				const data = {
					username: form.values.username,
					password: form.values.password,
				};
				const login = AxiosClientAPI.post(urlLogin, data, '', false);
				login
					.then((respo) => {
						if (respo?.status === 201) {
							localStorage.setItem('token', respo?.data?.refresh_token);
							const res = AxiosClientAPI.getDetail(
								'profile',
								respo?.data?.users.id,
								'',
								false
							);
							res
								.then((resp: any) => {
									localStorage.setItem(
										'USER',
										JSON.stringify(resp?.data?.account)
									);
									localStorage.setItem(
										'CHECKPROFILE',
										resp.data?.account.exist_Profile
									);
								})
								.catch((err) => {
									setVisible(false);
								});
						}
					})
					.catch((error) => {
						toast.error('Wrong! ' + error.response.data.message, {
							position: toast.POSITION.TOP_CENTER,
						});
						setVisible(false);
					});
				props.togglestate(e, 1, response?.data.author._id, false);
			});
		} else {
			toast.error('Input Wrong !', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		handleOpen.close();
	};

	const prevStep = (e: React.MouseEvent) => {
		props.togglestate(e, 0, '', true);
		// window.location.href = '/login';
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
		<div>
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
							<Link
								href={'../login'}
								style={{
									display: 'flex',
									cursor: 'pointer',
									textDecoration: 'none',
									color:
										theme.colorScheme === 'dark'
											? 'white'
											: theme.colors.dark[8],
								}}>
								Back
							</Link>
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
					transitionProps={{
						transition: 'fade',
						duration: 300,
						timingFunction: 'linear',
					}}
					centered
					size="auto">
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

export default RegisterComponents;
