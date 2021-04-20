import React, { useState } from 'react'

import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import * as Icon from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

// Custom Components
import CategoriesList from './CategoriesList'

function TabPanel(panelProps) {
  const { children, value, index, ...other } = panelProps

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const UserCategories = props => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Expense" icon={<Icon.CallMade />} {...a11yProps(0)} />
          <Tab label="Income" icon={<Icon.CallReceived />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CategoriesList
            type={'expense'} 
            {...props}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoriesList
            type={'income'} 
            {...props}      
        />
      </TabPanel>
    </>
  )
}

export default UserCategories
