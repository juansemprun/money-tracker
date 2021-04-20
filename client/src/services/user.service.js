import axios from 'axios'

export default class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getUserProfile = userId => this.api.get(`/getUserProfile/${userId}`)
}