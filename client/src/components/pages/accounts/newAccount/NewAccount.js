import React, { useEffect, useState } from 'react'

import { useStyles } from './styles/newAccount.styles'
import CloseIcon from '@material-ui/icons/Close'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  CssBaseline,
  Container,
  Avatar
} from '@material-ui/core'

// Custom Components
import NewAccountForm from './NewAccountForm'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const NewAccount = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new account
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create new account
            </Typography>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountBalanceIcon />
            </Avatar>
            <Typography component="h1" variant="h5">New Account</Typography>
            <NewAccountForm
              {...props}
              handleClose={() => handleClose()}
              userAccounts={props.userAccounts}
            />
          </div>
        </Container>
      </Dialog>
    </>
  )
}

export default NewAccount