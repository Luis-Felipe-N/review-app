export interface Review {
  id: string
  title: string
  description?: string
  thumbnail?: string
  link?: string
  bacth?: string
  rating: number
  album_link: string
  price: number
  weight: number
  created_at: Date

  user: {
    id: string
    username: string
    name: string
    email: string
    avatar_url: string
  }
  // user_id String
}