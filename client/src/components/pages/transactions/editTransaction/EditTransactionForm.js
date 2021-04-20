import React, { useState, useEffect } from 'react'

import { useStyles } from './styles/editTransactionForm.styles'

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

// Custom Components
// import DeleteTransaction from './../deleteTransaction/DeleteTransaction'
import DeleteTransaction from './../deleteTransaction/DeleteTransaction'

const EditTransactionForm = props => {
    const classes = useStyles()
    const userOwner = props.loggedInUser._id
    const transactionType = props.type
    const accountService = new accountServices()
    const { register, handleSubmit, control, errors } = useForm()

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
            .editTransaction(props.transactionToEdit._id, transactionData)
            .then(() => {
                let diffAmount = 0
                if (props.transactionToEdit.amount !== transactionAmount) {
                    diffAmount = (props.transactionToEdit.amount - (transactionAmount))
                    const newAccountAmount = (props.transactionToEdit.accountAmount - (diffAmount))
                    accountService
                        .editAccount(props.transactionToEdit.accountId, { amount: newAccountAmount })
                        .then(() => {
                            props.handleClose(false)
                            props.getUserTransactions()
                        })
                        .catch(err => console.log('Err updating account amount: ', { err }))
                }



            })
            .catch(err => console.log('Err updating transaction: ', { err }))
    }

    useEffect(() => {
        getUserCategoriesByType(transactionType)
    }, [])

    const getUserCategoriesByType = type => {
        const categoriesService = new categoriesServices()
        categoriesService
            .getUserCategoriesByType(type, userOwner)
            .then(response => setCategoryData(response.data))
            .catch(err => console.log('Err getting user categories: ', { err }))
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
                        defaultValue={props.transactionToEdit.amount}
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
                            value={props.transactionToEdit.date}
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
                        defaultValue={props.transactionToEdit.description}
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
                        defaultValue={props.transactionToEdit.categoryId}
                        variant="outlined"
                        inputRef={register}
                        rules={{ required: true }}
                        className={classes.formControl}
                        error={errors.category ? true : false}
                        label={categoryData.length ? "Category" : "Loading..."}
                        disabled={categoryData.length ? false : true}
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
                        defaultValue={props.transactionToEdit.accountId}
                        variant="outlined"
                        inputRef={register}
                        rules={{ required: true }}
                        className={classes.formControl}
                        error={errors.account ? true : false}
                        disabled
                        label="Account"
                    >
                        <MenuItem value={props.transactionToEdit.accountId}>
                            {props.transactionToEdit.accountName}
                        </MenuItem>
                    </Controller>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Edit Transaction
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <DeleteTransaction
                        itemToDelete={props.transactionToEdit}
                        handleClose={() => props.handleClose()}
                        getUserTransactions={props.getUserTransactions}
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default EditTransactionForm
