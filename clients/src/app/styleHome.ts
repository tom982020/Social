
import { createStyles, rem } from '@mantine/core';
const useHomeStyles = createStyles((theme) => ({

    footer: {
        [theme.fn.largerThan('md')]: {
            display: 'none'
        },
    },
    Grid: {
        [theme.fn.smallerThan('md')]: {
            display: 'none'
        },
    },
    SwitchColor: {
        [theme.fn.largerThan('sm')]: {
            display: 'none'
        },
    },
    SizeIcon: {
        [theme.fn.largerThan('md')]: {
            fontSize: '16px'
        },
        [theme.fn.smallerThan('md')]: {
            fontSize: '12px'
        },
    },
    StackNav: {
        [theme.fn.largerThan('md')]: {
            alignItems: 'flex-end'
        },
        [theme.fn.smallerThan('md')]: {
            alignItems: 'flex-start'
        },
    },
    footerNav: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingTop: theme.spacing.md,
        marginBottom: '27%'
    },
    Navbar: {
        [theme.fn.largerThan('md')]: {
            fontSize: '40px'
        },
        [theme.fn.smallerThan('md')]: {
            fontSize: '20px'
        },
    },
    Tab: {
        [theme.fn.largerThan('md')]: {
            display: 'none'
        },
    },
    TabDesktop: {
        [theme.fn.smallerThan('md')]: {
            display: 'none'
        },
    },
    cardPost: {
        [theme.fn.largerThan('md')]: {
            paddingRight: '220px',
            paddingLeft: '220px',
            marginTop: '0'
        },
        [theme.fn.smallerThan('md')]: {
        },
    }
}));

export default useHomeStyles