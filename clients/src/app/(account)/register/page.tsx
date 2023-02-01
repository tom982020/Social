/** @format */
'use client';
import { useEffect, useState } from 'react';
import {
	Stepper,
	Box,
	Container,
	Card,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import RegisterComponents from 'components/register/registerComponent';
import ProfileComponent from 'components/register/profileComponent';

const RegisterComponent: React.FC = () => {

	const [someState, setSomeState] = useState(0);
	const [idAcount, setIDAccount] = useState('');

	const toggleState = (e: React.MouseEvent, active: number,idAcount:string) => {
		setSomeState(active);
		setIDAccount(idAcount);
	}
	useEffect(() => {

		let checkUser = localStorage.getItem('USER')
		if (checkUser) {
			const check = JSON.parse(checkUser)
			!check.exist_Profile ? setSomeState(1) : setSomeState(0)
		}
	})

	const [opened, handleOpen] = useDisclosure(false);


	return (
		<Box sx={{ width: '40%' }}>
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
								transition={{ type: 'spring', duration: 1.5 }}>
								<div style={{ marginLeft: '-49%' }}>
									<RegisterComponents toggleState={(e, active,idAcount) => toggleState(e, active,idAcount)} />
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
								transition={{ type: 'spring', duration: 1.5 }}>
								<div style={{ marginLeft: '-50%' }}>
									<ProfileComponent id={idAcount}  toggleState={(e, active,idAcount) => toggleState(e, active,'')} />
								</div>
							</motion.div>
						</Stepper.Step>
						<Stepper.Step
							label="Final step"
							description="Get full access">
							<motion.div
								className="box"
								// style={{ width: '30%' }}
								animate={{ x: '50%' }}
								transition={{ type: 'spring', duration: 1.5 }}>
								<div style={{ marginLeft: '-50%' }}>
									Step 3 content: Create an account
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
									Step 3 content: Create an account
								</div>
							</motion.div>
						</Stepper.Completed>
					</Stepper>
				</Card>
{/* 
				<Group
					position="center"
					mt="xl">
					<Button
						variant="default"
						onClick={prevStep}>
						Back
					</Button>
					<Button  onClick={nextStep}>{ active > 2 ? 'Completed' :' Next step'}</Button>
				</Group> */}
				
			</Container>
		</Box>
	);
};

export default RegisterComponent;
