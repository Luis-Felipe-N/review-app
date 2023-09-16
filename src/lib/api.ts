import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.DOMAIN_URL,
})

export const apiClient = axios.create({
  baseURL: '/api/',
})
