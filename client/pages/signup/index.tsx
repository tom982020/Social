/** @format */

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid } from '@mui/material';
import RegisterComponent from '../../components/signUp/register';
import ProfileComponent from '../../components/signUp/profile';
import UploadAvatarComponent from '../../components/signUp/uploadAvatar';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export default function Logout() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleClickSave = (event: React.MouseEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
	return (
		<Grid
			container
			spacing={1}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh', minWidth: '100%' }}>
			<Grid
				item
				xs={6}
				style={{ minWidth: '700px' }}>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						boxShadow: 4,
						bgcolor: (theme) =>
							theme.palette.mode === 'dark' ? '#101010' : '#fff',
						color: (theme) =>
							theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
						borderRadius: 2,
					}}>
					{/* <AppBar position="static"> */}
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="inherit"
						variant="fullWidth"
						aria-label="full width tabs example">
						<Tab
							label="Sign Up"
							icon={<AccountCircle />}
							iconPosition="start"
							{...a11yProps(0)}
						/>
						<Tab
							label="Set up profile"
							icon={<ContactEmergencyIcon />}
							iconPosition="start"
							{...a11yProps(1)}
						/>
						<Tab
							label="Upload Avatar"
							icon={<ImageIcon />}
							iconPosition="start"
							{...a11yProps(2)}
						/>
					</Tabs>
					{/* </AppBar> */}
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}>
						<TabPanel
							value={value}
							index={0}
							dir={theme.direction}>
							<RegisterComponent
								handleClickSave={(e, newValue: number) => handleClickSave(e, 1)}
							/>
						</TabPanel>
						<TabPanel
							value={value}
							index={1}
							dir={theme.direction}>
							<ProfileComponent
								handleClickSave={(e, newValue: number) =>
									handleClickSave(e, newValue)
								}
							/>
						</TabPanel>
						<TabPanel
							value={value}
							index={2}
							dir={theme.direction}>
							<UploadAvatarComponent
								handleClickSave={(e, newValue: number) => handleClickSave(e, 1)}
							/>
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Grid>
		</Grid>
	);
}
