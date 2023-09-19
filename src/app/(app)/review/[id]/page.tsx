import { Review } from '@/@types'
import { Comments } from '@/app/components/review/comments'
import { GridImages } from '@/app/components/review/grid-images'
import { Rating } from '@/app/components/review/rating'
import { api } from '@/lib/api'

import { AxiosError } from 'axios'

interface ReviewProps {
  params: {
    id: string
  }
}


async function getReview(reviewId: string): Promise<Review | Error> {
  try {
    const { data } = await api.get('review/' + reviewId)
    return data.data.review
  } catch (error) {
    const messageError =
      error instanceof AxiosError
        ? error.response?.data.message
        : 'Ocorreu algum erro'
    return new Error(messageError)
  }
}

export default async function Review({ params }: { params: { id: string } }) {
  console.log('[REVIEWID]', params.id)

  const review = await getReview(params.id)
  console.log('[REVIEW]', review)

  if (review instanceof Error) {
    return <div>DEU MERDA{review.message}</div>
  }

  return (
    <div className="flex container mx-auto min-h-full justify-center py-12 gap-4 lg:flex-row flex-col">
      <div className="w-full">
        <GridImages review={review} />
        <div className="p-4 mt-4 bg-zinc-900 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl">{review.title}</h1>
            <Rating review={review} />
          </div>
          <div className="mt-1">
            <strong>Comentário sobre o produto</strong>
            <p className="text-zinc-200">{review.description}</p>
          </div>
          <span className="block mt-1">
            <strong>Link:</strong>{' '}
            <a className="underline text-blue-500" href={review.link}>
              {review.link}
            </a>
          </span>
        </div>
      </div>

      <Comments review={review} />
    </div>
  )
}
