import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

export const apiClient = axios.create({
  baseURL: '/api/',
})
