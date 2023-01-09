/** @format */

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HttpsIcon from '@mui/icons-material/Https';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Typography from '@mui/material/Typography';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Image from 'next/image';
import { Container, Grid } from '@mui/material';

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
	const [date, setDate] = React.useState<Dayjs | null>(dayjs());

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const clickNew = (newValue: number) => {
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
							label="Item Three"
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
							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<AccountCircle
										sx={{ color: 'action.active', mr: 1, my: 0.5 }}
									/>
									<TextField
										id="input-with-sx"
										label="User name"
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>
							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
									<TextField
										id="input-with-sx"
										label="Password"
										type="password"
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>
							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
									<TextField
										id="input-with-sx"
										label="Email address"
										type="email"
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>
							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<LocalPhoneIcon
										sx={{ color: 'action.active', mr: 1, my: 0.5 }}
									/>
									<TextField
										id="input-with-sx"
										label="Phone number"
										type="phone"
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>
							<Container>
								<Box
									style={{ margin: '20px', padding: '10px' }}
									sx={{ flexGrow: 1 }}>
									<Grid
										container
										spacing={2}>
										<Grid
											xs={6}
											md={6}
											style={{ padding: '5px' }}>
											<Button
												variant="outlined"
												sx={{ borderRadius: '25px', margin: '5px' }}
												color="error"
												fullWidth>
												Cancel
											</Button>
										</Grid>
										<Grid
											xs={6}
											md={6}
											style={{ padding: '5px' }}>
											<Button
												variant="outlined"
												sx={{ borderRadius: '25px', margin: '5px' }}
												color="success"
												onClick={() => clickNew(1)}
												// href="/signup"
												fullWidth>
												Submit
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Container>
						</TabPanel>
						<TabPanel
							value={value}
							index={1}
							dir={theme.direction}>
							<Grid
								container
								spacing={2}
								style={{ paddingLeft: '17px' }}>
								<Grid
									xs={6}
									md={6}>
									<Container>
										<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
											<AccountCircle
												sx={{ color: 'action.active', mr: 1, my: 0.5 }}
											/>
											<TextField
												id="input-with-sx"
												label="Nick name"
												variant="standard"
												fullWidth
											/>
										</Box>
									</Container>
								</Grid>
								<Grid
									xs={6}
									md={6}>
									<Container>
										<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
											<QueryBuilderIcon
												sx={{ color: 'action.active', mr: 1, my: 0.5 }}
											/>
											{/* <TextField
										id="input-with-sx"
										// label="Birth date"
										type="date"
										variant="standard"
										fullWidth
									/> */}
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DesktopDatePicker
													label="Birth date"
													value={date}
													onChange={(newValue) => {
														setDate(newValue);
													}}
													renderInput={(params) => (
														<TextField
															variant="standard"
															fullWidth
															{...params}
														/>
													)}
												/>
											</LocalizationProvider>
										</Box>
									</Container>
								</Grid>
							</Grid>

							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<AssignmentIndIcon
										sx={{ color: 'action.active', mr: 1, my: 0.5 }}
									/>
									<TextField
										id="input-with-sx"
										label="Bio"
										multiline
										maxRows={7}
										// rows={2}
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>

							<Container>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									<FmdGoodIcon
										sx={{ color: 'action.active', mr: 1, my: 0.5 }}
									/>
									<TextField
										id="input-with-sx"
										label="Destination"
										multiline
										maxRows={7}
										// rows={2}
										variant="standard"
										fullWidth
									/>
								</Box>
							</Container>
							<Container>
								<Box
									style={{ margin: '20px', padding: '10px' }}
									sx={{ flexGrow: 1 }}>
									<Grid
										container
										spacing={2}>
										<Grid
											xs={6}
											md={6}
											style={{ padding: '5px' }}>
											<Button
												variant="outlined"
												sx={{ borderRadius: '25px', margin: '5px' }}
												color="error"
												onClick={() => clickNew(0)}
												fullWidth>
												Cancel
											</Button>
										</Grid>
										<Grid
											xs={6}
											md={6}
											style={{ padding: '5px' }}>
											<Button
												variant="outlined"
												sx={{ borderRadius: '25px', margin: '5px' }}
												color="success"
												onClick={() => clickNew(2)}
												// href="/signup"
												fullWidth>
												Submit
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Container>
						</TabPanel>
						<TabPanel
							value={value}
							index={2}
							dir={theme.direction}>
							<Container>
								<Image
									// className={styles.logo}
									src="/Logo.jpg"
									alt="Next.js Logo"
									width={150}
									height={150}
									priority
								/>
								<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
									{/* <FmdGoodIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
									<TextField
										id="input-with-sx"
										label="Destination"
										type="file"
										// rows={2}
										variant="standard"
										fullWidth
									/> */}
									<Button
										variant="contained"
										component="label">
										Upload File
										<input
											type="file"
											hidden
										/>
									</Button>
								</Box>
							</Container>
						</TabPanel>
					</SwipeableViews>
				</Box>
			</Grid>
		</Grid>
	);
}
