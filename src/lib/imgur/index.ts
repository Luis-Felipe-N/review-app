import axios from "axios";

export const imgur = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    "Authorization": `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`
  }
})
