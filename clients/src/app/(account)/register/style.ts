import { createStyles, rem } from "@mantine/core";

const useRegisterStyles = createStyles((theme) => ({
    root: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
            height: '40%',
        },
        [theme.fn.largerThan('md')]: {
            width: '40%',
        },
    },

    box: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
            marginLeft: '-50%'
        },
        [theme.fn.largerThan('md')]: {
            width: '100%',
            marginLeft: '-50%'
        },
    },
    button: {
        [theme.fn.smallerThan('sm')]: {
            width: '85px',
            fontSize: '11px',
        },
        [theme.fn.largerThan('md')]: {
            md: 'md'
        },
    },

    boxInput: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
        [theme.fn.largerThan('md')]: {
            width: '90%',
        },
    },
}));

export default useRegisterStyles;