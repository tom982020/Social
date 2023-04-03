/** @format */
'use client';
import {
	Box,
	Container,
	Card,
	Image,
	Text,
	Button,
	Group,
	TextInput,
	Checkbox,
	Tooltip,
	LoadingOverlay,
} from '@mantine/core';
import { IconAlertCircle, IconLockOpen, IconUserCheck } from '@tabler/icons';
import { motion } from 'framer-motion';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { ILogin } from 'constant/interface/IvalidationAccount';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AxiosClientAPI } from 'core/AxiosClient';
import useLoginStyles from './style';

const LoginComponent = () => {
	// Declare
	const { classes } = useLoginStyles()
	const [validate, setValidate] = useState<ILogin>({
		email: '',
		password: '',
		username: '',
	});
	const [valueUsername, setValueUsername] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(false);
	const router = useRouter();

	// form
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			username: '',
			termsOfService: false,
		},

		validate: {
			email: (value) => (value.length > 0 ? '' : 'Input your email address'),
			password: (value) => (value.length > 0 ? '' : 'Input your password'),
		},
	});

	//handle
	const handleSubmit = () => {
		let formData = {
			username: form.values.username.split('@')[1] == undefined ? form.values.username : '',
			email: form.values.username.split('@')[1] != undefined ? form.values.username : '',
			password: form.values.password
		}
		if (form.values.username != '' && form.values.password != '') {
			setVisible(true);
			const url = 'http://localhost:8080/login';
			const resLogin = AxiosClientAPI.post('login', formData, 'Login', true);
			resLogin.then(async (response) => {
				if (response?.status === 201) {
					localStorage.setItem('token', response.data.refresh_token);
					// const token = localStorage.getItem('token');
					const resProfile = AxiosClientAPI.getDetail(
						'profile',
						response.data.users.id,
						'',
						false
					);
					resProfile.then(async (resp) => {
						localStorage.setItem('USER', JSON.stringify(resp?.data.account));
						localStorage.setItem(
							'CHECKPROFILE',
							resp?.data.account.exist_Profile
						);
						if (!resp?.data.account.exist_Profile) {
							router.push('/register');
							// setVisible(false);
						} else {
							router.push('/');
							setVisible(false);
						}
					}).catch((err) => {
						setVisible(false);
					});
				} else {
					setTimeout(() => {
						toast.error('Error username or passwrod!', {
							position: toast.POSITION.TOP_RIGHT,
						});
						setVisible(false);
					}, 1000)
				}
			}).catch((error) => {
				toast.error('Error username or passwrod!', {
					position: toast.POSITION.TOP_RIGHT,
				});
				setVisible(false);
			});
		} else {
			toast.error('Input Not Empty !', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<div style={{height : '1000px',width: '100%'}}>
			<LoadingOverlay
				loaderProps={{ size: 'xl', color: 'cyan', variant: 'bars' }}
				overlayOpacity={0.4}
				overlayColor="#c5c5c5"
				overlayBlur={3}
				visible={visible}
			/>
			<motion.div
				className={classes.root}
				animate={{ x: '140%',y: '50%' }}
				transition={{ type: 'spring', duration: 1.5 }}>
				<Box className={classes.box}>
					<Container
						size="sm">
						<Card
							shadow="sm"
							p=""
							radius="md"
							withBorder>
							<Card.Section>
								<Image
									src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
									height={160}
									alt="Norway"
								/>
							</Card.Section>

							<Group
								position="apart"
								mt="md"
								mb="xs">
								<Container>
									<Text
										weight={500}
										size={'xl'}>
										Log In
									</Text>
								</Container>
							</Group>

							<Box
								className={classes.boxInput}
								mx="auto">
								<form
									onSubmit={form.onSubmit(
										(values, _event) => {
											// setFormValues(values);
											setValueUsername(values.email);
										},
										(validationErrors, _values, _event) => {
											setValidate({
												email: validationErrors.email
													? validationErrors.email.toString()
													: '',
												password: validationErrors.password
													? validationErrors.password.toString()
													: '',
												username: '',
											});
										}
									)}>
									<TextInput
										withAsterisk
										icon={<IconUserCheck size={16} />}
										label="Email or Username"
										placeholder="your@email.com..."
										{...form.getInputProps('email')}
										{...form.getInputProps('username')}
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

									<Checkbox
										mt="md"
										label="I agree to sell my privacy"
										{...form.getInputProps('termsOfService', {
											type: 'checkbox',
										})}
									/>

									<Group
										position="right"
										mt="md">
										<Button
											variant="light"
											color="teal"
											type="submit"
											className={classes.button}
											onClick={handleSubmit}>
											Log In
										</Button>
										<Button className={classes.button} variant="light">
											<Link
												onClick={() => setVisible(true)}
												href="/register"
												style={{ textDecoration: 'none', color: "#8282ff" }}>
												Register
											</Link>
										</Button>
									</Group>
								</form>
							</Box>
						</Card>
					</Container>
				</Box>
			</motion.div>
		</div>
	);
};

export default LoginComponent;
