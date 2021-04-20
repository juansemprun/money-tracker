
import axios from 'axios'

export default class ProfileService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    editProfile = (userId, user) => this.api.put(`editProfile/${userId}`, user)
}
