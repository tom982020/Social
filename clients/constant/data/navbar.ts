/** @format */

import { IconAddressBook, IconBrandGoogleHome, IconBuildingStore, IconCompass, IconLock, IconMessageCircle, IconPhoto, IconPower, IconSettings } from '@tabler/icons';

const dataNavbar = [
    {
        icon: IconBrandGoogleHome,
        label: 'Home',
    },
    {
        icon: IconCompass,
        label: 'Discovery',
        child: [
            {
                label: 'New',
            },
            {
                label: 'Top',
            },
            {
                label: 'Trending',
            },
        ],
    },
    {
        icon: IconBuildingStore,
        label: 'World Tour',
        child: [
            {
                label: 'New tour',
            },
            {
                label: 'Top tour',
            },
            {
                label: 'Trending tour',
            },
            {
                label: 'Best seller tour'
            },
            {
                label: 'Sales tour'
            }
        ]
    },
    {
        icon: IconSettings,
        label: 'Settings',
    }
];

const dataUserNav = [
    {
        icon: IconAddressBook,
        label: 'Settings',
    },
    {
        icon: IconLock,
        label: 'Security',
        child: [
            {
                label: 'Change Password',
            }
        ]
    }
]

export { dataNavbar, dataUserNav }
