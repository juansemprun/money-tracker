import axios from 'axios'

export default class AccountTypesService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllAccountTypes = () => this.api.get('/getAllAccountTypes')
}