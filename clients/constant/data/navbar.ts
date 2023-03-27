/** @format */

import { IconAddressBook, IconArticle, IconBrandGoogleHome, IconBuildingStore, IconCompass, IconLock, IconMessageCircle, IconPhoto, IconPower, IconSettings } from '@tabler/icons';

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
                id: 1,
                label: 'New',
            },
            {
                id: 2,
                label: 'Top',
            },
            {
                id: 3,
                label: 'Trending',
            },
            {
                id: 4,
                label: 'Hashtags'
            }
        ],
    },
    {
        icon: IconBuildingStore,
        label: 'World Tour',
        child: [
            {
                id: 6,
                label: 'New tour',
            },
            {
                id: 7,
                label: 'Top tour',
            },
            {
                id: 8,
                label: 'Trending tour',
            },
            {
                id: 9,
                label: 'Best seller tour'
            },
            {
                id: 10,
                label: 'Sales tour'
            }
        ]
    },
    {
        icon: IconArticle,
        label: 'Blogs'
    },
    {
        icon: IconSettings,
        label: 'Settings',
    }
];

const dataUserNav = [
    {
        icon: IconAddressBook,
        label: 'Profile',
    },
    {
        icon: IconLock,
        label: 'Security',
        child: [
            {
                label: 'Change Password',
            }
        ]
    },
    {
        icon: IconSettings,
        label: 'Settings User',
    }
]

export { dataNavbar, dataUserNav }
