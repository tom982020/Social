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

const LoginComponent = () => {
	const [validate, setValidate] = useState<ILogin>({
		email: '',
		password: '',
	});
	const clearErrors = useForm();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			termsOfService: false,
		},

		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? '' : 'Input your email address',
			password: (value) => (value.length > 0 ? '' : 'Input your password'),
		},
	});

	const duration = 10000;
	// const r = form.validateField('email');
	// console.log(r);
	return (
		<motion.div
			className="box"
			style={{width: '30%'}}
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
									},
									(validationErrors, _values, _event) => {
										setValidate({
											email: validationErrors.email,
											password: validationErrors.password,
										});
									}
								)}>
								<TextInput
									withAsterisk
									icon={<IconUserCheck size={16} />}
									label="Email or Username"
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
									<Button variant="light" color="teal" type="submit">Log In</Button>
									<Button variant="light"><Link href="/register" style={{textDecoration: 'none', color:'blue'}}>Register</Link></Button>
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
