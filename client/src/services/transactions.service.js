import axios from 'axios'

export default class TransactionService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    newTransaction = transaction => this.api.post('/newTransaction', transaction)
    getUserTransactions = userId => this.api.get(`/getUserTransactions/${userId}`)
    getTransactionsByCategory = categoryId => this.api.get(`/getTransactionsByCategory/${categoryId}`)
    getTransactionsByAccount = accountId => this.api.get(`/getTransactionsByAccount/${accountId}`)
    editTransaction = (transactionId, transaction) => this.api.put(`/editTransaction/${transactionId}`, transaction)
    deleteTransaction = transactionId => this.api.delete(`/deleteTransaction/${transactionId}`)
}