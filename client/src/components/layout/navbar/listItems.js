import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { sidebarData } from './navbarData'

const primaryList = sidebarData.filter(element => element.navbarItem === 'primary')
const secondaryList = sidebarData.filter(element => element.navbarItem === 'secondary')

export const mainListItems = (
    <div>
        {primaryList.map((elm, index) => {
            return (
                <Link to={elm.path} key={index} style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button>
                        <ListItemIcon>{elm.icon}</ListItemIcon>
                        <ListItemText primary={elm.name} />
                    </ListItem>
                </Link>
            )
        })}
    </div>
)

export const secondaryListItems = (
    <div>
        {secondaryList.map((elm, index) => {
            return (
                <Link to={elm.path} key={index} style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button>
                        <ListItemIcon>{elm.icon}</ListItemIcon>
                        <ListItemText primary={elm.name} />
                    </ListItem>
                </Link>
            )
        })}
    </div>
)
