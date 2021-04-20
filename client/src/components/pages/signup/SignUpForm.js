import React from 'react'
import { Link } from 'react-router-dom'

import { useStyles } from './styles/signUpForm.styles'
import { Grid, Button, TextField, Typography } from '@material-ui/core'

import { useForm } from 'react-hook-form'

import authServices from './../../../services/auth.service'

const SignUpForm = props => {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = formData => {
    const authService = new authServices()
    authService
      .signup(formData)
      .then(response => {
        props.saveUser(response.data)
        props.history.push('/profile')
      })
      .catch(err => console.log('Err: ', { err }))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            autoFocus
            error={errors.name ? true : false}
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
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
            inputRef={register({ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
          />
          {errors.password?.type === "pattern" &&
            <Typography color="error" variant="caption">
              <strong>Password must have:</strong>
              <ul>
                <li>Minimum eight characters</li>
                <li>At least one uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character (@$!%*?&)</li>
              </ul>
            </Typography>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="/login" >
            <Typography variant="body2" color="primary">
              Already have an account? Log In
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUpForm
