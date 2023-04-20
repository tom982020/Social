/** @format */

import {
	Button,
	Card,
	Container,
	Grid,
	Input,
	Modal,
	Row,
	useInput,
	Text,
	Textarea,
} from '@nextui-org/react';
import AnimationCore from '../../../core/Animation';
import ButtonCore from '../../../core/Button';
import {
	MdOutlineNavigateNext,
	MdOutlineArrowBackIosNew,
	MdCloudDone,
	MdDone,
} from 'react-icons/md';
import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { dataTabs } from '../../../dataContants/signUp.constants';
import { useState } from 'react';
import React from 'react';
import AnimationClickCore from '../../../core/AnimationClick';
import toast from 'react-hot-toast';
import eventEmitter from '@/middleware/emitEvent';

import 'react-datepicker/dist/react-datepicker.css';
import { getYear150, getYear18 } from '../../../service/get18YearOld';

const SignUpComponent = () => {
	const [active, setActive] = useState(0);
	const { value, reset, bindings } = useInput('');
	const [username, setUsername] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [modal, setModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [nickname, setNickname] = useState<string>('');
	const [BIO, setBIO] = useState<string>('');
	const [destination, setDestination] = useState<string>('');

	const Year18 = getYear18()
	const Year150 = getYear150()
	const maxDate = new Date(Year18).toISOString().split('T')[0];
	const validateEmail = (value: string) => {
		return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
	};
	const validatePhone = (value: string) => {
		return value.match(/^[0-9._%+-]{10,11}$/i);
	};
	const validatePassword = (value: string) => {
		return value.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/);
	};

	eventEmitter.on('cookies', (cookie) => {
		console.log(cookie);
	});

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
		const isValidPhone = validatePhone(phone);
		const isValidEmail = validateEmail(value);
		const isValidPassword = validatePassword(password);
		if (!isValidPhone) {
			toast('Invalid Phone! Phone must 10-11 number', {
				icon: <BsFillPatchExclamationFill />,
				style: {
					borderRadius: '10px',
					background: '#f8f8f8',
					color: '#eb0d0d',
				},
			});
			setModal(false);
		}
		if (!isValidEmail) {
			toast('Invalid Email! Email must have @ and domain.com', {
				icon: <BsFillPatchExclamationFill />,
				style: {
					borderRadius: '10px',
					background: '#f8f8f8',
					color: '#eb0d0d',
				},
			});
			setModal(false);
		}
		if (!isValidPassword) {
			toast(
				'Invalid Password! Password must have special character and number and more than 8 character',
				{
					icon: <BsFillPatchExclamationFill />,
					style: {
						borderRadius: '10px',
						background: '#f8f8f8',
						color: '#eb0d0d',
					},
				}
			);
			setModal(false);
		}

		if (isValidEmail && isValidPassword && isValidPhone && active == 0) {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					email: value,
					password: password,
					phone: phone,
				}),
			});
			if (res.status === 201) {
				const json = await res.json();
				// setData(json);
				toast('Register Success!', {
					icon: <MdCloudDone />,
					style: {
						borderRadius: '10px',
						background: '#f8f8f8',
						color: '#63af43',
					},
				});
				setActive(1);
				setModal(false);
				const resLogin = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: value,
						password: password,
					}),
				});
			}
		} else {
			const res = await fetch('/api/createprofile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nickname: nickname,
					BIO: BIO,
					Destination: destination,
					DOB: selectedDate,
				}),
			});
			if (res.status == 200) {
				const json = await res.json();
				console.log(json);
			}
			setModal(false);
		}
	};
	const hanldeCancel = () => {};
	const hanldeClick = (id: number) => {
		setActive(id);
	};

	return (
		<div style={{ height: '100vh' }}>
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
								<Card style={{ width: '100%' }}>
									<Card.Header>
										<Grid.Container
											gap={0}
											justify="center"
											style={{ width: '100%' }}>
											<Grid xs={5}>
												<Button.Group
													color="warning"
													animated
													style={{ width: '100%' }}>
													{dataTabs.map((item, index) => {
														return (
															<Button
																key={index}
																onClick={() => hanldeClick(item.id)}
																flat
																disabled={active !== item.id}
																color={'success'}
																icon={
																	active !== item.id && active == 1 ? (
																		<MdDone />
																	) : (
																		item.icon
																	)
																}>
																{item.label}
															</Button>
														);
													})}
												</Button.Group>
											</Grid>
										</Grid.Container>
									</Card.Header>
									<Card.Body>
										<AnimationClickCore
											child={
												<div className={active == 0 ? 'grid' : 'hidden'}>
													<Input
														onChange={(e) => setUsername(e.target.value)}
														placeholder="Username...."
														label="Username"
														width={'100%'}
													/>
													<Input
														{...bindings}
														onClearClick={reset}
														status={helper.color}
														color={'default'}
														helperColor={helper.color}
														placeholder="Email....."
														label="Email"
													/>
													<Input
														onChange={(e) => setPhone(e.target.value)}
														onClearClick={reset}
														placeholder="Phone...."
														label="Phone"
													/>
													<Input
														onChange={(e) => setPassword(e.target.value)}
														onClearClick={reset}
														placeholder="Password...."
														label="Password"
													/>
												</div>
											}
											visible={active == 0 ? true : false}
										/>
										<AnimationClickCore
											child={
												active == 1 ? (
													<div className={active == 1 ? 'grid' : 'hidden'}>
														<Input
															placeholder="Nick name...."
															label="Nick name"
															width={'100%'}
															onChange={(e)=> setNickname(e.target.value)}
														/>
														<Textarea
															label="BIO"
															placeholder="BIO ....."
															onChange={(e)=> setBIO(e.target.value)}
														/>
														<Input
															placeholder="Destination...."
															label="Destination"
															onChange={(e)=> setDestination(e.target.value)}
														/>
														<Input
															type="date"
															max={maxDate}
															placeholder="Destination...."
															label="DOB"
															onChange={(e:any) => setSelectedDate(e.target.value)}
														/>
													</div>
												) : null
											}
											visible={active == 1 ? true : false}
										/>
									</Card.Body>
									<Card.Footer>
										<Row justify="flex-end">
											<ButtonCore
												iconRight={null}
												icon={<MdOutlineArrowBackIosNew />}
												color={'warning'}
												size={'sm'}
												text={'Back'}
												Click={hanldeCancel}
											/>
											<ButtonCore
												icon={null}
												iconRight={<MdOutlineNavigateNext />}
												color={'primary'}
												size={'sm'}
												text={active == 0 ? 'Next' : 'Confirm'}
												Click={(e) => setModal(true)}
											/>
										</Row>
										<Modal
											closeButton
											aria-labelledby="modal-title"
											open={modal}
											onClose={() => setModal(false)}>
											<Modal.Header>
												<Text
													id="modal-title"
													size={18}>
													Are you sure
													<Text
														b
														size={18}>
														{' '}
														Information ?
													</Text>
												</Text>
											</Modal.Header>
											<Modal.Body></Modal.Body>
											<Modal.Footer>
												<Button
													auto
													flat
													color="error"
													onPress={() => setModal(false)}>
													Close
												</Button>
												<Button
													auto
													flat
													color="success"
													onClick={(e) => hanldeLogin(e)}>
													Confirm
												</Button>
											</Modal.Footer>
										</Modal>
									</Card.Footer>
								</Card>
							</Grid>
						</Grid.Container>
					}
				/>
			</Container>
		</div>
	);
};

export default SignUpComponent;
