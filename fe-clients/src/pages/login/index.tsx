/** @format */

import {
	Card,
	Container,
	Grid,
	Input,
	Row,
	useInput,
	Text,
} from '@nextui-org/react';
import ButtonCore from '../../../core/Button';
import { ImEnter } from 'react-icons/im';
import AnimationCore from '../../../core/Animation';
import { RiUserAddLine } from 'react-icons/ri';
import Image from 'next/image';
import React, { useState } from 'react';
import backgroundLogin from '../../../public/Login.png';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { MdCloudDone } from 'react-icons/md';
import { Dna } from 'react-loader-spinner';
import ContentLoader, { Facebook } from 'react-content-loader';
const LoginComponent = () => {
	const { value, reset, bindings } = useInput('');
	const [password, setPassword] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(false);
	const image: any = backgroundLogin;
	const [data, setData] = useState<any>();

	const validateEmail = (value: string) => {
		return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
	};

	const helper: any = React.useMemo(() => {
		if (!value)
			return {
				text: '',
				color: '',
			};
		const isValid = validateEmail(value);
		return {
			text: isValid ? 'Correct email' : 'Enter a valid email',
			color: isValid ? 'success' : 'error',
		};
	}, [value]);

	const hanldeLogin = async (e: any) => {
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: value,
					password: password,
				}),
			});
			if (res.status === 201) {
				const json = await res.json();
				setData(json);
				toast('Login Success!', {
					icon: <MdCloudDone />,
					style: {
						borderRadius: '10px',
						background: '#f8f8f8',
						color: '#63af43',
					},
				});
				setVisible(true);
				Router.push('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const hanldeCancel = () => {
		Router.push('/signUp');
	};
	return (
		<div style={{ height: '100vh' }}>
			{visible ? (
				<ContentLoader />
			) : (
				<Container style={{ height: '100%' }}>
					<AnimationCore
						child={
							<Grid.Container
								gap={0}
								justify="center"
								style={{ height: '100%' }}
								alignContent="center">
								<Grid
									md={4}
									xl={4}
									style={{ width: 'fit-content' }}>
									<Card style={{ width: 'fit-content' }}>
										<Card.Header>
											<Grid.Container
												gap={2}
												justify="center">
												<Grid xs={5}>
													<Text
														b
														size="$xl"
														transform="uppercase"
														css={{
															textGradient:
																'45deg, $blue600 -20%, $pink600 50%',
														}}>
														WelCome to Social
													</Text>
												</Grid>
											</Grid.Container>
										</Card.Header>
										<Card.Body>
											<Grid.Container
												gap={2}
												justify="center">
												<Grid xs={4}>
													<Image
														width={300}
														height={200}
														src={image}
														alt="Default Image"
													/>
												</Grid>
												<Grid xs={8}>
													<Grid.Container
														gap={0}
														direction="row"
														justify="center"
														css={{ width: '100%' }}>
														<Grid
															xs={12}
															css={{ width: '100%' }}>
															<Input
																{...bindings}
																clearable
																shadow={false}
																onClearClick={reset}
																status={helper.color}
																color={'default'}
																helperColor={helper.color}
																helperText={helper.text}
																placeholder="Email Address....."
																size="md"
																// labelPlaceholder="Email Address"
																css={{ width: '100%' }}
															/>
														</Grid>
														<Grid
															xs={12}
															css={{ width: '100%' }}>
															<Input.Password
																size="md"
																// labelPlaceholder="Password"
																placeholder="Password.........."
																color="default"
																onChange={(e: any) =>
																	setPassword(e.target.value)
																}
																css={{ width: '100%' }}
															/>
														</Grid>
													</Grid.Container>
												</Grid>
											</Grid.Container>
										</Card.Body>
										<Card.Footer>
											<Row justify="flex-end">
												<ButtonCore
													iconRight={null}
													icon={<RiUserAddLine />}
													color={'warning'}
													size={'sm'}
													text={'Sign Up'}
													Click={hanldeCancel}
												/>
												<ButtonCore
													iconRight={null}
													icon={<ImEnter />}
													color={'primary'}
													size={'sm'}
													text={'Sign In'}
													Click={(e) => hanldeLogin(e)}
												/>
											</Row>
										</Card.Footer>
									</Card>
								</Grid>
							</Grid.Container>
						}
					/>
				</Container>
			)}
		</div>
	);
};

export default LoginComponent;
