// 'use client'

import { Review } from '@/@types'
import { GridImages } from '@/app/components/review/GridImages'
import { Rating } from '@/app/components/review/Rating'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { api } from '@/lib/api'
import { formatDistanceDate } from '@/lib/utils'
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

export default async function Review({ params }: ReviewProps) {
  const review = await getReview(params.id)

  if (review instanceof Error) {
    return <div>{review.message}</div>
  }

  return (
    <div className="flex container mx-auto min-h-full  justify-center py-12 gap-4">
      <div className="w-full">
        <GridImages review={review} />
        <div className="p-4 mt-4 bg-zinc-900 rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">{review.title}</h1>
            <Rating review={review} />
          </div>
          <div>
            <strong>Comentário sobre o produto</strong>
            <p className="text-zinc-200">{review.description}</p>
          </div>
        </div>
      </div>
      <Card className="w-1/3 bg-zinc-900 rounded-xl p-4">
        <CardHeader></CardHeader>

        <CardContent>
          <ul>
            <li>
              <Card className="bg-zinc-800 rounded-xl">
                <CardHeader className="flex-row gap-2 pb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.user.avatar_url} />
                    <AvatarFallback>
                      {review.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <strong className="text-sm">{review.title}</strong>
                    <small className="text-zinc-400 text-xs">
                      {formatDistanceDate(review.created_at)}
                    </small>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-200">
                    tênis lindo irmão, brabo hahahhahaha mas eai eu ia pegar um
                    black cat
                  </p>
                </CardContent>
              </Card>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
