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
	GroupedTransition,
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

const LoginComponent = () => {
	const [validate, setValidate] = useState<ILogin>({
		email: '',
		password: '',
		username: '',
	});
	const [valueUsername, setValueUsername] = useState<string>('');

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

	const handleSubmit = () => {
		if (validate.email == '' && validate.password == '') {
			// return;
			const url = 'http://localhost:8080/login';
			const options = {
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: form.values,
				url,
			};
			axios(options)
				.then(async (response) => {
					if (response.status === 201) {
						axios.get(`http://localhost:8080/profile/${response.data.users.id}`)
							.then((res) => {
								toast.success('Login sucessfully', {
									position: toast.POSITION.TOP_RIGHT,
								});
								localStorage.setItem('USER',JSON.stringify(res.data.account) )
								if(!res.data.account.exist_Profile) window.location.href= '/register'
							})
							.catch((err) => {
								toast.error('Wrong! ' + err, {
									position: toast.POSITION.TOP_CENTER,
								});
							});
					}
				})
				.catch((error) => {
					// console.log(error)
					toast.error('Wrong! ' + error.response.data.message, {
						position: toast.POSITION.TOP_CENTER,
					});
				});
		} else {
			toast.error('Input Wrong !', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<motion.div
			className="box"
			style={{ width: '30%' }}
			animate={{ x: '50%' }}
			transition={{ type: 'spring', duration: 1.5 }}>
			<Box sx={{ width: '100%', marginLeft: '-50%' }}>
				<Container
					size="xl"
					px="xs">
					<Card
						shadow="sm"
						p="lg"
						radius="md"
						withBorder>
						<Card.Section
							component="a"
							href="https://mantine.dev/">
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
							sx={{ maxWidth: '90%' }}
							// style={{marginLeft: '-45%'}}
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
										onClick={handleSubmit}>
										Log In
									</Button>
									<Button variant="light">
										<Link
											href="/register"
											style={{ textDecoration: 'none', color: 'blue' }}>
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
	);
};

export default LoginComponent;
