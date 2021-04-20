import React, { useState } from 'react'

import { useStyles } from './styles/newTransaction.styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { Receipt } from '@material-ui/icons'

// Custom Components
import NewTransactionForm from './NewTransactionForm'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NewTransaction = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [transactionType, setTransactionType] = useState('')
  const handleTransactionType = type => {
    handleClickOpen()
    setTransactionType(type)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button
            className={classes.newTransactionExpense}
            variant="outlined"
            onClick={() => handleTransactionType('expense')}
          >
            Create expense transaction
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            className={classes.newTransactionIncome}
            variant="outlined"
            color="primary"
            onClick={() => handleTransactionType('income')}
          >
            Create income transaction
          </Button>
        </Grid>
      </Grid>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              New {transactionType} transaction
            </Typography>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={transactionType === 'expense' ? classes.avatarExpense : classes.avatarIncome}>
              <Receipt />
            </Avatar>
            <Typography component="h1" variant="h5">New {transactionType} transaction</Typography>
            <NewTransactionForm
              {...props}
              transactionType={transactionType}
              userTransactions={props.userTransactions}
              handleNewTransactionModalClose={() => handleClose()}
            />
          </div>
        </Container>

      </Dialog>
    </>
  )
}

export default NewTransaction
