import axios from 'axios'

export default class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signup = user => this.api.post('/signup', user)
    login = user => this.api.post('/login', user)
    demoLogin = () => this.api.post('/demo-login')
    logout = () => this.api.post('/logout')
    isLoggedIn = () => this.api.get('/loggedin')
}