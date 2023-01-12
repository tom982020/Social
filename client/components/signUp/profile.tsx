/** @format */

import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

type ChildProps = {
	handleClickSave: (e: React.MouseEvent, newValue: number) => void;
};

const ProfileComponent: React.FC<ChildProps> = (props) => {
	const [date, setDate] = React.useState<Dayjs | null>(dayjs());

	return (
		<div>
			<Grid
				container
				spacing={2}
				style={{ paddingLeft: '17px' }}>
				<Grid
					xs={6}
					md={6}>
					<Container>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
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
					<AssignmentIndIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
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
					<FmdGoodIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
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
								onClick={(e) => props.handleClickSave(e, 0)}
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
								onClick={(e) => props.handleClickSave(e, 2)}
								// href="/signup"
								fullWidth>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</div>
	);
};

export default ProfileComponent;
