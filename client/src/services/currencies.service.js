import axios from 'axios'

export default class CurrenciesService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllCurrencies = () => this.api.get('/getAllCurrencies')
}