import React, { useState } from 'react'

import { useStyles } from './styles/transactions.styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

// Custom Components
import NewTransaction from './newTransaction/NewTransaction'
import UserTransactions from './userTransactions/UserTransactions'

// Services
import transactionsServices from './../../../services/transactions.service'

const Transactions = props => {
  const transactionsService = new transactionsServices()
  const classes = useStyles()
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const [userTransactions, setUserTransactions] = useState([])

  const getUserTransactions = () => {
    transactionsService
      .getUserTransactions(props.loggedInUser._id)
      .then(response => {
        setUserTransactions(response.data)
      })
      .catch(err => console.log('Err getting user categories: ', { err }))
  }

  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <NewTransaction
                loggedInUser={props.loggedInUser}
                getUserTransactions={() => getUserTransactions()}
                transactionsServices={transactionsService}
              />
            </Grid>

            <Grid item xs={12}>
              <UserTransactions
                {...props}
                userTransactions={userTransactions}
                getUserTransactions={() => getUserTransactions()}
                transactionsServices={transactionsService}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Transactions
