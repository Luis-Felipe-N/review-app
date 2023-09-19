'use client'

import { Review } from '@/@types'
import { Post } from '@/app/components/review/post'
import { apiClient } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from './components/ui/skeleton'

export default function Home() {
  const {
    data: reviews,
    isLoading,
  } = useQuery<Review[]>(['reviews'], async (): Promise<Review[]> => {
    const response = await apiClient.get('review')
    return response.data.reviews
  })

  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between p-8 lg:px-24 py-12">
      <section className="w-full">
        <ul className="flex gap-4 flex-wrap items-stretch w-full lg:grid lg:grid-cols-3">
          {isLoading ? (
            <>
              <li>
                <Skeleton className="w-96 h-96" />
              </li>
              <li>
                <Skeleton className="w-96 h-96" />
              </li>
              <li>
                <Skeleton className="w-96 h-96" />
              </li>
            </>
          ) : reviews ? (
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
