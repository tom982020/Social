/** @format */

import React from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import Grid from '@mui/material/Unstable_Grid2';

type ChildProps = {
	handleClickSave: (e: React.MouseEvent, newValue: number) => void;
};

const RegisterComponent: React.FC<ChildProps> = (props) => {
	return (
		<Container>
			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField
					id="input-with-sx"
					label="User name"
					variant="standard"
					fullWidth
				/>
			</Box>

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

			<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
				<LocalPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
				<TextField
					id="input-with-sx"
					label="Phone number"
					type="phone"
					variant="standard"
					fullWidth
				/>
			</Box>

			<Box
				style={{ margin: '20px', padding: '10px' }}
				sx={{ flexGrow: 1 }}>
				<Grid container>
					<Grid
						xs={6}
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
						style={{ padding: '5px' }}>
						<Button
							variant="outlined"
							sx={{ borderRadius: '25px', margin: '5px' }}
							color="success"
							onClick={(e) => props.handleClickSave(e, 1)}
							// href="/signup"
							fullWidth>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default RegisterComponent;
