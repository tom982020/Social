/** @format */

// import  '../signin/index.scss'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import HttpsIcon from '@mui/icons-material/Https';
import Image from 'next/image';
// import Grid from '@mui/material/Unstable_Grid2';
import styles from '../../styles/Home.module.scss';
// import Container from '@mui/material/Container';
import { Container, Grid } from '@mui/material';

export default function Login() {
	return (
		<>
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
					style={{ minWidth: '500px' }}>
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
							padding: '10px'
						}}>
						<Box
							justifyContent="center"
							alignItems="center"
							textAlign="center">
							<Image
								className={styles.logo}
								src="/Logo.jpg"
								alt="Next.js Logo"
								width={150}
								height={150}
								priority
							/>
						</Box>

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
											fullWidth
											endIcon={<LoginIcon />}>
											Sign In
										</Button>
									</Grid>
									<Grid
										xs={6}
										md={6}
										style={{ padding: '5px' }}>
										<Button
											variant="outlined"
											sx={{ borderRadius: '25px', margin: '5px' }}
											color="info"
											href='/signup'
											fullWidth
											endIcon={<SensorOccupiedIcon />}>
											Sign Up
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Container>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
