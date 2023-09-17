import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.DOMAIN_URL + 'api/',
})

export const apiClient = axios.create({
  baseURL: process.env.DOMAINCLIENT_URL + '/api/',
})
