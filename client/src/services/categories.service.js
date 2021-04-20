import axios from 'axios'

export default class CategoryService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    newCategory = category => this.api.post('/newCategory', category)
    getUserCategories = userId => this.api.get(`/getUserCategories/${userId}`)
    getUserCategoriesByType = (categoryType, userId) => this.api.get(`/getUserCategoriesByType/${categoryType}?userId=${userId}`)
    editCategory = (categoryId, category) => this.api.put(`/editCategory/${categoryId}`, category)
    deleteCategory = categoryId => this.api.delete(`/deleteCategory/${categoryId}`)
}