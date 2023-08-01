// import { Review } from "@prisma/client"

import { Rating, Review } from '@/@types'

export function useRating() {
  const filterRating = (ratings: Rating[]) => {
    const good = ratings.filter((rating) => rating.type === 'good')
    const bad = ratings.filter((rating) => rating.type === 'bad')

    return [good, bad]
  }

  return {
    filterRating,
  }
}
