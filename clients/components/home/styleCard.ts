/** @format */

import { createStyles, rem } from '@mantine/core';
const useStylespostCard = createStyles((theme) => ({
	card: {
		position: 'relative',
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: rem(12),
		pointerEvents: 'none',
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: rem(5),
	},

	action: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},
	image: {
		[theme.fn.largerThan('md')]: {
			height: '250px',
		},
		[theme.fn.smallerThan('md')]: {
			height: '180px',
		},
	},

	tagName: {
		[theme.fn.largerThan('xl')]: {
			position: 'absolute',
			bottom: '8%',
		},
		width: '93%',
		maxHeight: '200px',
	},

	comment: {
		padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
		marginTop: `${theme.spacing.sm}`,
	},

	body: {
		// paddingLeft: rem(54),
		// paddingTop: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
	},

	content: {
		'& > p:last-child': {
			marginBottom: 0,
		},
	},
}));

export default useStylespostCard;
