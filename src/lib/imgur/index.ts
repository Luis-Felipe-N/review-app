import axios from 'axios'
import ImgurClient from 'imgur'

export const imgur = new ImgurClient({
  clientId: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
})
