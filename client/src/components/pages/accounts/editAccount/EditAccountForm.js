import React, { useState, useEffect } from 'react'

import { useStyles } from './EditAccountForm.styles'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'

import { useForm, Controller } from 'react-hook-form'

// Services
import accountServices from './../../../../services/accounts.service'
import accountTypesServices from './../../../../services/accountTypes.service'
import currenciesServices from './../../../../services/currencies.service'

// Custom Components
import DeleteAccount from './../deleteAccount/DeleteAccount'

const EditAccountForm = props => {
    const classes = useStyles()

    const { register, handleSubmit, control, errors } = useForm()

    const [currency, setCurrency] = useState('')
    const [accountType, setAccountType] = useState('')
    const [currencyData, setCurrencyData] = useState([])
    const [accountTypeData, setAccountTypeData] = useState([])

    const handleAccountTypeSelect = e => setAccountType(e.target.value)
    const handleCurrencySelect = e => setCurrency(e.target.value)

    const onSubmit = formData => {
        const accountService = new accountServices()

        accountService
            .editAccount(props.accountToEdit._id, formData)
            .then(() => {
                props.getUserAccounts()
                props.handleClose(false)
            })
            .catch(err => console.log('Err updating account: ', { err }))
    }

    useEffect(() => {
        getAccountTypes()
        getCurrency()
    }, [])

    const getAccountTypes = () => {
        const accountTypesService = new accountTypesServices()
        accountTypesService
            .getAllAccountTypes()
            .then(response => {
                const accountTypes = []
                response.data.map(elm => accountTypes.push({ ...elm }))
                setAccountTypeData(accountTypes)
            })
            .catch(err => console.log('Err getting account types: ', { err }))
    }

    const getCurrency = () => {
        const currenciesService = new currenciesServices()
        currenciesService
            .getAllCurrencies()
            .then(response => {
                const currencies = []
                response.data.map(elm => currencies.push({ ...elm }))
                setCurrencyData(currencies)
            })
            .catch(err => console.log('Err getting currencies: ', { err }))
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                    <TextField
                        error={errors.name ? true : false}
                        name="name"
                        label="Account Name"
                        id="name"
                        defaultValue={props.accountToEdit.name}
                        inputRef={register({ required: true })}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                {/* Account Type*/}
                <Grid item xs={12}>
                    <Controller
                        as={TextField}
                        control={control}
                        name="type"
                        error={errors.accountType ? true : false}
                        select
                        id="accountType"
                        label="Account"
                        value={accountType}
                        defaultValue={props.accountToEdit.accountTypeId}
                        inputRef={register}
                        rules={{ required: true }}
                        onChange={handleAccountTypeSelect}
                        variant="outlined"
                        className={classes.formControl}
                    >
                        {accountTypeData.map((elm, index) => (
                            <MenuItem key={index} value={elm._id}>
                                {elm.name} - <small> {elm.description}</small>
                            </MenuItem>
                        ))}
                    </Controller>
                </Grid>
                {/* Currency*/}
                <Grid item xs={6}>
                    <Controller
                        as={TextField}
                        control={control}
                        name="currency"
                        error={errors.currency ? true : false}
                        select
                        id="currency"
                        label="Currency"
                        value={currency}
                        defaultValue={props.accountToEdit.currencyId}
                        inputRef={register}
                        rules={{ required: true }}
                        onChange={handleCurrencySelect}
                        variant="outlined"
                        className={classes.formControl}
                    >
                        {currencyData.map((elm, index) => (
                            <MenuItem key={index} value={elm._id}>
                                {elm.symbol} - <small> {elm.country}</small>
                            </MenuItem>
                        ))}
                    </Controller>
                </Grid>
                {/* Initial Amount */}
                <Grid item xs={6}>
                    <TextField
                        error={errors.initialAmount ? true : false}
                        name="initialAmount"
                        label="Initial Amount"
                        id="initialAmount"
                        type="number"
                        defaultValue={props.accountToEdit.initialAmount}
                        variant="outlined"
                        fullWidth
                        disabled
                    />
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
                        Edit Account
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <DeleteAccount
                        {...props}
                        itemToDelete={props.accountToEdit}
                        handleClose={() => props.handleClose()}
                        getUserAccounts={props.getUserAccounts}
                    />
                </Grid>
            </Grid>

        </form>
    )
}

export default EditAccountForm
