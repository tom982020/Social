/** @format */
'use client';
import { useEffect, useState } from 'react';
import {
	Stepper,
	Box,
	Container,
	Card,
	LoadingOverlay,
	ThemeIcon,
	Group,
	Title,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import RegisterComponents from 'components/register/registerComponent';
import ProfileComponent from 'components/register/profileComponent';
import UploadImageProfileComponent from 'components/register/uploadAvatarProfileComponent';
import { IconCheck } from '@tabler/icons';
import router from 'next/router';
import useRegisterStyles from './style';

const RegisterComponent: React.FC = () => {
	//Declare
	const {classes} = useRegisterStyles()
	const [someState, setSomeState] = useState(0);
	const [idAcount, setIDAccount] = useState('');
	const [visible, setVisible] = useState(false);

	const toggleState: any = (
		e: React.MouseEvent,
		active: number,
		idAcount: string,
		visible: boolean
	) => {
		setSomeState(active);
		setIDAccount(idAcount);
		setVisible(visible);
	};
	useEffect(() => {
		let checkUser = localStorage.getItem('CHECKPROFILE');
		const checkAvatar: any = localStorage.getItem('PROFILE');
		if (checkUser) {
			const check = JSON.parse(checkUser);
			const checkAva = JSON.parse(checkAvatar);
			!check
				? setSomeState(1)
				: !checkAva.avatar_saved
				? setSomeState(2)
				: setSomeState(3);
		}
		if (someState == 3) {
			setTimeout(() => {
				window.location.href = '/';
			}, 3000);
		}
	});

	return (
		<Box className={classes.root}>
			<LoadingOverlay
				loaderProps={{ size: 'xl', color: 'cyan', variant: 'bars' }}
				overlayOpacity={0.4}
				overlayColor="#c5c5c5"
				overlayBlur={3}
				visible={visible}
			/>
			<Container
				size="xl"
				px="xs">
				<Card
					shadow="sm"
					p="lg"
					radius="md"
					withBorder>
					<Stepper
						active={someState}
						breakpoint="sm">
						<Stepper.Step
							label="First step"
							// style={{ marginLeft: '-50%' }}
							description="Create an account">
							<motion.div
								className="box"
								// style={{ width: '30%' }}
								animate={{ x: '50%' }}
								transition={{ type: 'spring', stiffness: 100 }}>
								<div style={{ marginLeft: '-49%' }}>
									<RegisterComponents
										togglestate={(e, active, idAcount, visible) =>
											toggleState(e, active, idAcount, visible)
										}
									/>
								</div>
							</motion.div>
						</Stepper.Step>

						<Stepper.Step
							label="Second step"
							description="Create Profile">
							<motion.div
								className="box"
								// style={{ width: '30%' }}
								animate={{ x: '50%' }}
								transition={{ type: 'spring', stiffness: 100 }}>
								<div style={{ marginLeft: '-50%' }}>
									<ProfileComponent
										togglestate={(e, active, idAcount, name) =>
											toggleState(e, active, idAcount, name)
										}
									/>
								</div>
							</motion.div>
						</Stepper.Step>
						<Stepper.Step
							label="Final step"
							description="Upload your Avatar">
							<motion.div
								className="box"
								// style={{ width: '30%' }}
								animate={{ x: '50%' }}
								transition={{ type: 'spring', stiffness: 100 }}>
								<div style={{ marginLeft: '-50%' }}>
									<UploadImageProfileComponent
										togglestate={(e, active, idAcount, name) =>
											toggleState(e, active, idAcount, name)
										}
									/>
								</div>
							</motion.div>
						</Stepper.Step>
						<Stepper.Completed>
							<motion.div
								className="box"
								// style={{ width: '30%' }}
								animate={{ x: '50%' }}
								transition={{ type: 'spring', duration: 1.5 }}>
								<div style={{ marginLeft: '-50%' }}>
									<Group
										sx={{ width: '65%' }}
										position="center"
										spacing="md">
										<Title order={4}>Create Your Avatar Sucessfully</Title>
										<ThemeIcon
											radius="xl"
											size="xl"
											color="teal">
											<IconCheck />
										</ThemeIcon>
									</Group>
								</div>
							</motion.div>
						</Stepper.Completed>
					</Stepper>
				</Card>
			</Container>
		</Box>
	);
};

export default RegisterComponent;
