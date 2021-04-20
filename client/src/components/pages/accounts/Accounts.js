import React, { useState } from 'react'

import { useStyles } from './styles/Accounts.styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Custom Components
import NewAccount from './newAccount/NewAccount'
import UserAccounts from './userAccounts/UserAccounts'

// Services
import accountsServices from './../../../services/accounts.service'



const Accounts = props => {
  const classes = useStyles()

  const [userAccounts, setUserAccounts] = useState([])

  const getUserAccounts = () => {
    const accountsService = new accountsServices()
    accountsService
      .getUserAccounts(props.loggedInUser._id)
      .then(response => {
        setUserAccounts(response.data)
      })
      .catch(err => console.log('Err getting user accounts: ', { err }))
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} >
              <NewAccount
                {...props}
                loggedInUser={props.loggedInUser}
                getUserAccounts={() => getUserAccounts()}
              />
            </Grid>

            <Grid item xs={12} >
              <UserAccounts
                {...props}
                userAccounts={userAccounts}
                getUserAccounts={() => getUserAccounts()}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Accounts
