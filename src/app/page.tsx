'use client'

import { Post } from '@/components/Post'
import { api } from '@/lib/api';
import { Review } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export default function Home() {

  const { data: reviews, isFetched } = useQuery<Review[]>(
    ["reviews"], 
    async () => {
      const response = await api.get('review')
      return response.data.reviews
    });

    console.log(reviews)

  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between px-24 py-12">
      <section className="w-full">
        <ul className="flex gap-4">
          { reviews ? (
            reviews.map(review => (
              <li key={review.id}>
                <Post review={review}/>
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
