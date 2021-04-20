import React, { useEffect, useState } from 'react'

import { useStyles } from './styles/accountList.styles'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'

import MaterialTable from 'material-table'

// Custom Components
import EditAccountForm from './../editAccount/EditAccountForm'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const AccountList = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
  
    const handleClose = () => {
        setOpen(false)
    }
    
    const accountsData = props.userAccounts
    const { getUserAccounts } = props
    const accountsList = [] 

    useEffect(() => getUserAccounts(), [accountsData.length])

    if (accountsData.length > 0) {
        accountsData.map(account => {
            return (
                accountsList.push({
                    _id: account._id,
                    name: account.name,
                    accountTypeId: account.type._id,
                    accountType: account.type.name,
                    currencyId: account.currency._id,
                    currency: account.currency.symbol,
                    initialAmount: account.initialAmount,
                    currencyAndInitialAmount: `${account.currency.symbol} ${account.initialAmount}`,
                    currencyAndCurrentAmount: `${account.currency.symbol} ${account.amount}`
                })
            )   
        })
    }

    const filterByAccountType = []
    accountsList.map(elm => filterByAccountType.push(elm))
    const userAccounts = filterByAccountType.filter(elm => elm.accountType === props.type)
    
    const [accountToEdit, setAccountToEdit] = useState([])
    const handleAccountData = account => {
        setAccountToEdit(account)
        setOpen(true)
    }

    return (
      <>
        <MaterialTable 
          title="Accounts"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Amount', field: 'currencyAndCurrentAmount'},
            { title: 'Initial Amount', field: 'currencyAndInitialAmount' }
          ]}
          data={[...userAccounts]}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => handleAccountData(rowData)
            }
          ]}
          options={
            {
              filterCellStyle: { textAlign: 'center' },
              exportButton: true,
              actionsColumnIndex: -1,
              cellStyle: { textAlign: 'center' },
              headerStyle: { fontWeight: 'bold', textAlign: 'center' },
            }
          }
        />
        {/*  Modal Window */}
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit account
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
                    <EditIcon />
                </Avatar>
              <Typography component="h1" variant="h5">Edit account</Typography>
                <EditAccountForm 
                  {...props} 
                  accountToEdit={accountToEdit} 
                  handleClose={() => handleClose()} 
                />       
            </div>
        </Container>

      </Dialog>    
    </>
  )
}

export default AccountList