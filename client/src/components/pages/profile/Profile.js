import React, { useState, useEffect } from 'react'

import { useStyles } from './styles/profile.styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Custom Components
import ProfileCard from './ProfileCard'
import EditProfileForm from './EditProfileForm'

const Profile = props => {
  const classes = useStyles()

  const [name, setName] = useState(props.loggedInUser.name)
  const [username, setUsername] = useState(props.loggedInUser.username)

  useEffect(() => { }, [name, username])

  const updateUserData = (newName, newUsername) => {
    setName(newName)
    setUsername(newUsername)
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <ProfileCard
                loggedInUser={props.loggedInUser}
                userData={{ name, username }}
              />
            </Grid>

            <Grid item xs={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <EditProfileForm
                  {...props}
                  userData={{ name, username }}
                  updateUserData={(newName, newUsername) => updateUserData(newName, newUsername)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Profile
