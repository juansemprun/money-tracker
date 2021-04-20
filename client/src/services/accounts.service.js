import axios from 'axios'

export default class AccountService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getUserAccounts = userId => this.api.get(`/getUserAccounts/${userId}`)
    getOneAccount = accountId => this.api.get(`/getOneAccount/${accountId}`)
    deleteAccount = accountId => this.api.delete(`/deleteAccount/${accountId}`)
    newAccount = account => this.api.post('/newAccount', account)
    editAccount = (accountId, account) => this.api.put(`/editAccount/${accountId}`, account)
}