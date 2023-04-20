/** @format */

import { useTheme as useNextTheme } from 'next-themes';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import {
	Navbar,
	Button,
	Link,
	Text,
	Switch,
	useTheme,
	Dropdown,
	Avatar,
	Input,
	Spacer,
	Card,
	Grid,
	User,
} from '@nextui-org/react';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { MdOutlineSearchOff } from 'react-icons/md';
import { collapseItemsMobile } from '../dataContants/constant';
import Router from 'next/router';
import {
	IProfileResponse,
	ISearchProfileResponse,
} from '../dataContants/interface/IProfile';
import AnimationCore from '../core/Animation';
export const NavbarComponent = () => {
	const { setTheme } = useNextTheme();
	const { isDark, type } = useTheme();
	const [state, toggle] = useState(false);
	const [profile, setProfile] = useState<IProfileResponse | null>(null);
	const [inputValue, setInputValue] = useState<string>('');
	const [searchProfile, setSearchProfile] =
		useState<ISearchProfileResponse | null>(null);

	const [props, api] = useSpring(
		() => ({
			from: { width: 0, opacity: 0 },
			to: {
				width: state ? 200 : 0,
				opacity: state ? 1 : 0,
				display: state ? 'block' : 'none',
			},
			config: { duration: 500 },
		}),
		[state]
	);

	useEffect(() => {
		const res = fetch('/api/verify/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		res.then(async (data) => {
			if (data.status === 201) {
				const pro = await data.json();
				setProfile({
					nickname: pro.decode.nickname,
					BIO: pro.decode.BIO,
					DOB: pro.decode.DOB,
					destination: pro.decode.destination,
					route: pro.decode.route,
					avatar: {
						id: pro.decode.avatar ? pro.decode.avatar.id : null,
						url: pro.decode.avatar ? pro.decode.avatar.url : null,
						secure_url: pro.decode.avatar ? pro.decode.avatar.secure_url : null,
					},
				});
			} else {
				Router.push('/login');
			}
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (inputValue != '') {
				const params = new URLSearchParams({
					search: inputValue,
				});
				const res = fetch(`/api/profile/searchProfile?${params}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				res.then(async (data) => {
					if (data.status === 200) {
						const json = await data.json();
						setSearchProfile(json.result);
						console.log(json);
					}
				});
			}
		}, 500); // Wait 500 milliseconds after last input event

		return () => {
			clearTimeout(timer);
		};
	}, [inputValue]);

	const handleLogout = async () => {
		const res = await fetch('/api/verify/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (res.status === 200) {
			const data = await res.json();
			Router.push('/login');
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInputValue(value);
	};

	return (
		<>
			<Navbar
				isBordered
				variant={'sticky'}>
				<Navbar.Toggle
					aria-label="toggle navigation"
					showIn="md"
				/>
				<Navbar.Brand
					css={{
						'@xs': {
							w: '12%',
						},
					}}>
					<Text
						b
						color="inherit">
						ACME
					</Text>
				</Navbar.Brand>
				<Navbar.Content hideIn="md">
					<Navbar.Link
						isActive
						href="#">
						Home
					</Navbar.Link>

					<Navbar.Link>
						{state == true ? (
							<MdOutlineSearchOff
								size={20}
								onClick={(e) => toggle(!state)}
							/>
						) : (
							<MdOutlineSearchOff
								size={20}
								onClick={(e) => toggle(!state)}
							/>
						)}
					</Navbar.Link>
					<animated.div style={props}>
						<Input
							aria-label="none"
							placeholder="Search People......"
							onChange={(e: any) => handleInputChange(e)}
						/>
					</animated.div>

					<Navbar.Link href="#">Pricing</Navbar.Link>
					<Navbar.Link href="#">Company</Navbar.Link>
				</Navbar.Content>
				<Navbar.Content>
					<Navbar.Content
						css={{
							'@xs': {
								w: '12%',
								jc: 'flex-end',
							},
						}}>
						<Dropdown placement="bottom-right">
							<Navbar.Item>
								<Dropdown.Trigger>
									<Avatar
										bordered
										as="button"
										color="secondary"
										size="md"
										src={profile?.avatar ? profile.avatar.secure_url : ''}
									/>
								</Dropdown.Trigger>
							</Navbar.Item>
							<Dropdown.Menu
								aria-label="User menu actions"
								color="secondary"
								style={{ width: '1000px' }}
								onAction={(actionKey) => console.log({ actionKey })}>
								<Dropdown.Item
									key="profile"
									css={{ height: '$18' }}>
									<Text
										b
										color="inherit"
										css={{ d: 'flex' }}>
										Signed in as
									</Text>
									<Text
										b
										color="inherit"
										css={{ d: 'flex' }}>
										{profile?.nickname}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item
									key="settings"
									withDivider>
									My Settings
								</Dropdown.Item>
								<Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
								<Dropdown.Item
									key="analytics"
									withDivider>
									Analytics
								</Dropdown.Item>
								<Dropdown.Item key="system">System</Dropdown.Item>
								<Dropdown.Item key="configurations">
									Configurations
								</Dropdown.Item>
								<Dropdown.Item
									key="help_and_feedback"
									withDivider>
									Help & Feedback
								</Dropdown.Item>
								<Dropdown.Item
									key="logout"
									withDivider
									color="error">
									<div onClick={handleLogout}>Log Out</div>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Content>
					{profile == null ? (
						<>
							<Navbar.Link
								color="inherit"
								href="#">
								Login
							</Navbar.Link>

							<Navbar.Item>
								<Button
									auto
									flat
									as={Link}
									href="#">
									Sign Up
								</Button>
							</Navbar.Item>
						</>
					) : null}

					<Navbar.Link color="inherit">
						<Switch
							checked={isDark}
							color="warning"
							onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
							iconOn={<BsSun />}
							iconOff={<BsMoonStars />}
						/>
					</Navbar.Link>
				</Navbar.Content>
				<Navbar.Collapse>
					{collapseItemsMobile.map((item, index) => (
						<Navbar.CollapseItem key={item}>
							<Link
								color="inherit"
								css={{
									minWidth: '100%',
								}}
								href="#">
								{item}
							</Link>
						</Navbar.CollapseItem>
					))}
				</Navbar.Collapse>
			</Navbar>
			<AnimationCore
				child={
					<div className={state == true ? 'fixed' : 'hidden'}>
						<Grid.Container
							style={{ width: '100%' }}
							justify="center">
							<Grid xl={2}>
								<Card css={{ mw: '400px' }}>
									<Card.Body>
										{searchProfile != null && searchProfile.docs.length > 0
											? searchProfile?.docs.map((item, index) => {
													return (
														<div key={index}>
															<User
																bordered
																src={item.avatar ? item.avatar.secure_url : ''}
																name={item.nickname}
																color="primary"
															/>
															<Spacer y={1} />
														</div>
													);
											  })
											: null}
									</Card.Body>
								</Card>
							</Grid>
						</Grid.Container>
					</div>
				}
			/>
		</>
	);
};
