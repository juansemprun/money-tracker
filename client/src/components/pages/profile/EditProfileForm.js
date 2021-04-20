import React, { useState, useEffect } from 'react'

import { useStyles } from './styles/editProfile.styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useForm } from 'react-hook-form'

import profileServices from './../../../services/profile.service'

const EditProfileForm = props => {
    const { register, handleSubmit, errors } = useForm()
    const classes = useStyles()
    
    const [disableField, setDisableField] = useState(true)
    const [name, setName] = useState(props.userData.name)
    const [username, setUsername] = useState(props.userData.username)

    useEffect(() => {
        props.updateUserData(name, username)
    }, [name, username])
    
    const onSubmit = formData => {
        const profileService = new profileServices()
        profileService
            .editProfile(props.loggedInUser._id, formData)
            .then(() => {
                setDisableField(true)
                setName(formData.name)
                setUsername(formData.username)
            })
            .catch(err => console.log('Err updating user: ', { err }))
    }

    const editForm = () => {
        setDisableField(!disableField)
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        disabled={disableField}
                        error={errors.name ? true : false}
                        name="name"
                        label="Name"
                        id="name"
                        defaultValue={name}
                        inputRef={register({required: true})}
                        variant="outlined"
                        fullWidth
                    />
                    {/* {errors.name && <span className={classes.errorMessage}>This field is required</span>} */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disableField}
                        error={errors.name ? true : false}
                        name="username"
                        label="Username"
                        id="username"
                        defaultValue={username}
                        inputRef={register({required: true})}
                        variant="outlined"
                        fullWidth
                    />
                    {errors.username && <span className={classes.errorMessage}>This field is required</span>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={disableField}
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        inputRef={register}
                        variant="outlined"
                        fullWidth
                        helperText="If you don't want to change your password leave this field blank"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={disableField}
            >
            Save
          </Button>
          <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={editForm}
            >
            {disableField ? "Edit" : "Cancel"}
          </Button>
        </form>
    )
}

export default EditProfileForm
