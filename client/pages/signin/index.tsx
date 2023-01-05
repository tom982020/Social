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
import Grid from '@mui/material/Unstable_Grid2';
import styles from '../../styles/Home.module.scss';

export default function Login() {
	return (
		<>
			<div className="login">
				<div className="__main">
					<div className="--login">
						<Image
							className={styles.logo}
							src="/Logo.jpg"
							alt="Next.js Logo"
							width={150}
							height={150}
							priority
						/>
						<div className="--username">
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
						</div>
						<div className="--password">
							<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
								<HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
								<TextField
									id="input-with-sx"
									label="Password"
									variant="standard"
									fullWidth
								/>
							</Box>
						</div>
						<Box
							style={{ margin: '20px' }}
							sx={{ flexGrow: 1 }}>
							<Grid
								container
								spacing={2}>
								<Grid
									xs={6}
									md={6}>
									<Button
										variant="contained"
										sx={{ borderRadius: '25px' }}
										fullWidth
										endIcon={<LoginIcon />}>
										Sign In
									</Button>
								</Grid>
								<Grid
									xs={6}
									md={6}>
									<Button
										variant="contained"
										sx={{ borderRadius: '25px' }}
										color="info"
										fullWidth
										endIcon={<SensorOccupiedIcon />}>
										Sign Up
									</Button>
								</Grid>
							</Grid>
						</Box>
					</div>
				</div>
			</div>
		</>
	);
}
