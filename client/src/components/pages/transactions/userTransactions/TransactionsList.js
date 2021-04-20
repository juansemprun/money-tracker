import React, { useEffect, useState } from 'react'

import { useStyles } from './styles/transactionList.styles'

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
import EditTransactionForm from './../editTransaction/EditTransactionForm'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const TransactionsList = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const transactionsData = props.userTransactions
    const { getUserTransactions } = props
    const transactionsList = []

    useEffect(() => getUserTransactions(), [transactionsData.length])

    if (transactionsData.length > 0) {
        transactionsData.map(transaction => {
            return (
                transactionsList.push({
                    _id: transaction._id,
                    type: transaction.type,
                    date: transaction.date,
                    amount: transaction.amount,
                    symbol: transaction.account.currency.symbol,
                    userOwner: transaction.userOwner,
                    accountId: transaction.account._id,
                    accountName: transaction.account.name,
                    accountAmount: transaction.account.amount,
                    categoryId: transaction.category._id,
                    categoryName: transaction.category.name,
                    description: transaction.description,
                })
            )
        })
    }

    const filterByTransactionType = []
    transactionsList.map(elm => filterByTransactionType.push(elm))
    const userTransactions = filterByTransactionType.filter(elm => elm.type === props.type)

    const [transactionToEdit, settransactionToEdit] = useState([])
    const handleTransactionData = transaction => {
        settransactionToEdit(transaction)
        setOpen(true)
    }

    return (
        <>
            <MaterialTable
                title="Transactions"
                columns={[
                    {
                        title: 'Amount',
                        field: 'amount',
                        type: 'numeric',
                        cellStyle: {
                            color: props.type === 'expense' ? 'red' : 'green',
                            textAlign: 'center'
                        }, filtering: false
                    },
                    { title: 'Account', field: 'accountName', filtering: false },
                    { title: 'Category', field: 'categoryName', filtering: false },
                    { title: 'Date', field: 'date', type: 'date' },
                    { title: 'Description', field: 'description', filtering: false },
                ]}
                data={[...userTransactions]}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleTransactionData(rowData)
                    }
                ]}
                options={{
                    exportButton: true,
                    filtering: true,
                    actionsColumnIndex: -1,
                    headerStyle: { fontWeight: 'bold', textAlign: 'center' },
                    cellStyle: { textAlign: 'center' },
                }}
            />
            {/* Modal Window */}
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit transaction
                    </Typography>
                        <Button color="secondary" variant="contained" onClick={handleClose}>
                            Cancel
                    </Button>
                    </Toolbar>
                </AppBar>

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} style={{ backgroundColor: props.type === 'expense' ? 'red' : 'green' }} >
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Edit transaction</Typography>
                        <EditTransactionForm
                            {...props}
                            transactionToEdit={transactionToEdit}
                            handleClose={() => handleClose()}
                        />
                    </div>
                </Container>
            </Dialog>
        </>
    )
}

export default TransactionsList
