import React, { useState } from 'react'

import { useStyles } from './styles/loginForm.styles'
import { Grid, Button, TextField, Typography } from '@material-ui/core'

import { useForm } from 'react-hook-form'

import authServices from '../../../services/auth.service'

// Custom components
import SnackBar from './../../shared/snackBar/SnackBar'

const SignUpForm = props => {
  const classes = useStyles()
  const [handleSnackBar, setHandleSnackBar] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm()

  const onDemoLogin = () => {
    setDemoLoading(true)
    const authService = new authServices()
    authService
      .demoLogin()
      .then(response => {
        props.saveUser(response.data)
        props.history.push('/dashboard')
      })
      .catch(() => {
        setDemoLoading(false)
        setHandleSnackBar(true)
      })
  }

  const onSubmit = formData => {
    const authService = new authServices()
    authService
      .login(formData)
      .then(response => {
        props.saveUser(response.data)
        props.history.push('/dashboard')
      })
      .catch(() => setHandleSnackBar(true))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            autoFocus
            error={errors.username ? true : false}
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            error={errors.password ? true : false}
            inputRef={register({ required: true })}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submit}
      >
        Log in
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        className={classes.submit}
        onClick={onDemoLogin}
        disabled={demoLoading}
      >
        {demoLoading ? 'Preparing demo data…' : 'Try the demo user'}
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Registration is closed — try the demo user above
          </Typography>
        </Grid>
      </Grid>
      {handleSnackBar && <SnackBar severity="error" message="Incorrect username or password" handleSnackBar={() => setHandleSnackBar()} />}
    </form>
  )
}

export default SignUpForm
