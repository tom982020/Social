/** @format */

'use client';
import {
	createStyles,
	Image,
	Container,
	Title,
	Text,
	Button,
	SimpleGrid,
	rem,
} from '@mantine/core';
import router from 'next/router';
import image from '../../../../public/Error500.png';

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: rem(80),
		paddingBottom: rem(80),
	},

	title: {
		fontWeight: 900,
		fontSize: rem(34),
		marginBottom: theme.spacing.md,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(32),
		},
	},

	control: {
		[theme.fn.smallerThan('sm')]: {
			width: '100%',
		},
	},

	mobileImage: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	desktopImage: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},
}));

const error500Component = () => {
	const { classes } = useStyles();
	const handleSubmit = () => {
		window.location.href = '../';
	};
	return (
		<Container className={classes.root}>
			<SimpleGrid
				spacing={80}
				cols={2}
				breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
				<Image
					src={image.src}
					className={classes.mobileImage}
				/>
				<div>
					<Title className={classes.title}>Something is not right...</Title>
					<Text
						color="dimmed"
						size="lg">
						Page you are trying to open does not exist. You may have mistyped
						the address, or the page has been moved to another URL. If you think
						this is an error contact support.
					</Text>
					<Button
						variant="outline"
						size="md"
						mt="xl"
						onClick={handleSubmit}
						className={classes.control}>
						Go before page
					</Button>
				</div>
				<Image
					src={image.src}
					className={classes.desktopImage}
				/>
			</SimpleGrid>
		</Container>
	);
};

export default error500Component;
