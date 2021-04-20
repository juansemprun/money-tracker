import React, { useState, useEffect } from 'react'

import { useStyles } from './styles/dashboard.styles'

import { Container, Grid, Paper, Title, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

// Services
import accountServices from './../../../services/accounts.service'
import transactionServices from './../../../services/transactions.service'

// Charts
import BarChart from './../../shared/charts/BarChart'
import LineChart from './../../shared/charts/LineChart'

const Dashboard = props => {
    const classes = useStyles()

    const [barCharData, setbarCharData] = useState([])
    const [lineChartData, setlineChartData] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncomes, setTotalIncomes] = useState(0)

    useEffect(() => {
        getUserAccounts()
        getUserTransactions()
    }, [barCharData.length, lineChartData.length])

    const getUserAccounts = () => {
        const accountService = new accountServices()
        accountService
            .getUserAccounts(props.loggedInUser._id)
            .then(response => {
                const serviceDataBarChart = []
                response.data.map(elm => serviceDataBarChart.push(elm))
                setbarCharData(serviceDataBarChart)
            })
            .catch(err => console.log('Err getting user accounts: ', { err }))
    }

    const getUserTransactions = () => {
        const transactionService = new transactionServices()

        transactionService
            .getUserTransactions(props.loggedInUser._id)
            .then(response => {
                const serviceData = []
                const expenses = serviceData
                const incomes = serviceData
                response.data.map(elm => serviceData.push(elm))
                setlineChartData(serviceData)
                setTotalExpenses(serviceData.filter(elm => elm.amount < 0).map(elm => elm.amount).reduce((acc, curr) => acc + curr))
                setTotalIncomes(serviceData.filter(elm => elm.amount > 0).map(elm => elm.amount).reduce((acc, curr) => acc + curr))
                console.log(totalExpenses)
            })
            .catch(err => console.log('Err getting user transactions: ', { err }))

    }

    return (
        <>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Income / Expense Totals */}
                        <Grid item xs={12} md={4} lg={3} className={classes.containerTotalTransactions}>
                            <Paper className={classes.paper}>
                                {totalIncomes ? <><Typography component="p" variant="h4">Total Incomes:</Typography><Typography component="p" variant="h4" style={{ color: 'green' }}>{totalIncomes}</Typography></> : <><Skeleton variant="text" /><Skeleton variant="text" height={75} va /></>}
                            </Paper>
                            <Paper className={classes.paper}>
                                {totalExpenses ? <><Typography component="p" variant="h4">Total expenses:</Typography><Typography component="p" variant="h4" style={{ color: 'red' }}>{totalExpenses}</Typography></> : <><Skeleton variant="text" /><Skeleton variant="text" height={75} va /></>}
                            </Paper>
                        </Grid>
                        {/* Expenses-Income Chart */}
                        <Grid item xs={12} md={8} lg={9} >
                            <Paper className={classes.paper} style={{ alignItems: 'center' }}>
                                {lineChartData.length ? <Typography variant={"h5"} style={{ marginBottom: '20px' }}>Incomes VS Expenses</Typography> : <Skeleton variant="text" animation="wave" width={350} />}
                                {lineChartData.length ? <LineChart data={lineChartData} /> : <Skeleton variant="rect" animation="wave" width={750} height={250} />}
                            </Paper>
                        </Grid>
                        {/* Accounts Chart */}
                        <Grid item xs={12} >
                            <Paper className={classes.paper} style={{ alignItems: 'center' }}>
                                {barCharData.length ? <Typography variant={"h5"} style={{ marginBottom: '20px' }}>Initial amount VS Current Amount</Typography> : <Skeleton variant="text" animation="wave" width={350} />}
                                {barCharData.length ? <BarChart data={barCharData} /> : <Skeleton variant="rect" animation="wave" width={750} height={250} />}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default Dashboard
