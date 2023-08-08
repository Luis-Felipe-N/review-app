'use client'

import { Review } from '@/@types'
import { Post } from '@/app/components/review/Post'
import { apiClient } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function Profile() {
  const { data: reviews, isFetched } = useQuery<Review[]>(
    ['reviews'],
    async (): Promise<Review[]> => {
      const response = await apiClient.get('review')
      return response.data.reviews
    },
  )

  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between px-24 py-12">
      <section className="w-full">
        <ul className="flex gap-4 flex-wrap">
          {reviews ? (
            reviews.map((review) => (
              <li key={review.id}>
                <Post review={review} />
              </li>
            ))
          ) : (
            <p>Sem reviews</p>
          )}
        </ul>
      </section>
    </main>
  )
}
