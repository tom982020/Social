/** @format */

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CssBaseline from '@mui/material/CssBaseline';
import ArchiveIcon from '@mui/icons-material/Archive';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
export const Navbar = () => {
	return (
		<Box>
			<CssBaseline />
			<Paper
				sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
				elevation={3}>
				<BottomNavigation showLabels>
					<BottomNavigationAction
						label="Recents"
						icon={<RestoreIcon />}
					/>
					<BottomNavigationAction
						label="Favorites"
						icon={<FavoriteIcon />}
					/>
					<BottomNavigationAction
						label="Archive"
						icon={<ArchiveIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};
