import React from 'react'
import * as Icon from '@material-ui/icons/'

export const sidebarData = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Icon.Dashboard />,
    navbarItem: 'primary'
  },
  {
    name: 'Transactions',
    path: '/transactions',
    icon: <Icon.Receipt />,
    cName: 'nav-text',
    navbarItem: 'primary' 
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: <Icon.FormatListBulleted />,
    cName: 'nav-text',
    navbarItem: 'primary'
  },
  {
    name: 'Accounts',
    path: '/accounts',
    icon: <Icon.AccountBalance />,
    cName: 'nav-text',
    navbarItem: 'primary'              
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <Icon.Person />,
    cName: 'nav-text',
    navbarItem: 'secondary'
  }
  // {
  //   name: 'Log out',
  //   path: '/',
  //   icon: <Icon.ExitToApp />,
  //   cName: 'nav-text',
  //   navbarItem: 'secondary'
  // }
]