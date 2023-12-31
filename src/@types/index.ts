interface User {
  id: string
  username: string
  name: string
  email: string
  avatar_url: string
}

export interface Rating {
  type: 'bad' | 'good'
  id: 'bad' | 'good'

  user: User
}

export interface Comment {
  id: string
  content: string
  created_at: Date

  user: User
  review: Review
}

export interface Review {
  id: string
  title: string
  description?: string
  thumbnail?: string
  link?: string
  bacth?: string
  album_link: string
  price: number
  weight: number
  created_at: Date

  user: User

  comments: Comment[]
  ratings: Rating[]
}
