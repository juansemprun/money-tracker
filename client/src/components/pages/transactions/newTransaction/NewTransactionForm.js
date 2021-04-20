import React, { useState, useEffect } from 'react'

import { useStyles } from './styles/newTransactionForm.styles'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'

import { useForm, Controller } from 'react-hook-form'

// Services
import categoriesServices from './../../../../services/categories.service'
import accountServices from './../../../../services/accounts.service'

const NewTransactionForm = props => {
    const classes = useStyles()
    const userOwner = props.loggedInUser._id
    const transactionType = props.transactionType
    const accountService = new accountServices()
    const { register, handleSubmit, control, errors } = useForm()

    const [accountData, setAccountData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [selectedDate, handleDateChange] = useState(new Date())

    const onSubmit = formData => {
        const transactionService = props.transactionsServices
        const transactionAmount = transactionType === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount)
        const transactionData = {
            ...formData,
            userOwner,
            type: transactionType,
            amount: transactionAmount
        }

        transactionService
            .newTransaction(transactionData)
            .then(() => {
                const transactionAmount = transactionData.amount
                accountService
                    .getOneAccount(transactionData.account)
                    .then(response => response.data.amount)
                    .then(currentAccountAmount => {
                        const newAccountAmount = (currentAccountAmount + transactionAmount)
                        accountService
                            .editAccount(transactionData.account, { amount: newAccountAmount })
                            .then(() => {
                                props.handleNewTransactionModalClose(false)
                                props.getUserTransactions()
                            })
                            .catch(err => console.log('Err updating account: ', { err }))
                    })
                    .catch(err => console.log('Err getting account: ', { err }))
            })
            .catch(err => console.log('Err creating transaction: ', { err }))
    }

    useEffect(() => {
        getUserAccounts()
        getUserCategoriesByType(transactionType)
    }, [])

    const getUserCategoriesByType = type => {
        const categoriesService = new categoriesServices()
        categoriesService
            .getUserCategoriesByType(type, userOwner)
            .then(response => setCategoryData(response.data))
            .catch(err => console.log('Err getting user categories: ', { err }))
    }

    const getUserAccounts = () => {
        accountService
            .getUserAccounts(userOwner)
            .then((response) => setAccountData(response.data))
            .catch(err => console.log('Err getting user accounts: ', { err }))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2}>
                {/* Amount */}
                <Grid item xs={6}>
                    <TextField
                        name="amount"
                        label="Amount"
                        variant="outlined"
                        type="number"
                        fullWidth
                        inputRef={register({ required: true })}
                        error={errors.amount ? true : false}
                    />
                </Grid>
                {/* Date - Time */}
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            name="date"
                            label="Date"
                            ampm={false}
                            format="MM/dd/yyy HH:mm"
                            showTodayButton
                            fullWidth
                            inputVariant="outlined"
                            value={selectedDate}
                            onChange={handleDateChange}
                            inputRef={register({ required: true })}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                {/* Descripcion */}
                <Grid item xs={12}>
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        inputRef={register({ required: true })}
                        error={errors.description ? true : false}
                    />
                </Grid>
                {/* Transaction type */}
                <Grid item xs={6}>
                    <TextField
                        name="type"
                        label="Type"
                        variant="outlined"
                        disabled
                        fullWidth
                        value={transactionType}
                        // defaultValue={props.transactionType}    
                        inputRef={register({ required: true })}
                        error={errors.type ? true : false}
                    />
                </Grid>
                {/* Categories */}
                <Grid item xs={6}>
                    <Controller
                        as={TextField}
                        control={control}
                        select
                        name="category"
                        defaultValue=""
                        variant="outlined"
                        inputRef={register}
                        rules={{ required: true }}
                        className={classes.formControl}
                        error={errors.category ? true : false}
                        disabled={categoryData.length ? false : true}
                        label={categoryData.length ? "Category" : "Loading..."}
                    >
                        {categoryData.map((elm, index) => (
                            <MenuItem key={index} value={elm._id}>
                                {elm.name}
                            </MenuItem>
                        ))}
                    </Controller>
                </Grid>
                {/* Accounts */}
                <Grid item xs={12}>
                    <Controller
                        as={TextField}
                        control={control}
                        select
                        name="account"
                        defaultValue=""
                        variant="outlined"
                        inputRef={register}
                        rules={{ required: true }}
                        className={classes.formControl}
                        error={errors.account ? true : false}
                        disabled={accountData.length ? false : true}
                        label={accountData.length ? "Account" : "Loading..."}
                    >
                        {accountData.map((elm, index) => (
                            <MenuItem key={index} value={elm._id}>
                                {elm.name}
                            </MenuItem>
                        ))}
                    </Controller>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Add Transaction
          </Button>
        </form>
    )
}

export default NewTransactionForm
