import React from 'react'

import { useStyles } from './styles/login.styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, CssBaseline, Typography, Grid, Paper } from '@material-ui/core'

// Custom Components
import LogInForm from './LogInForm'

const LogIn = props => {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={7} className={classes.image} />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" className={classes.title}>
            Log in
          </Typography>
          <LogInForm {...props} />
        </div>
      </Grid>
    </Grid>
  )
}

export default LogIn