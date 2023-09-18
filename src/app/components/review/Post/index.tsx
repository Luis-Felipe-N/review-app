'use client'

import { Review } from '@/@types'
import { formatDistanceDate } from '@/lib/utils'
import { ChatTeardropDots } from '@phosphor-icons/react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { SliderRating } from './SliderRating'

interface PostProps {
  review: Review
}

export function Post({ review }: PostProps) {

  return (
    <Link href={`/review/${review.id}/`}>
      <Card className="w-96 rounded-2xl border-zinc-900 hover:border-purple-600 border-2">
        <CardHeader className="flex gap-2 flex-row">
          <Avatar className="w-12 h-12">
            <AvatarImage src={review.user.avatar_url} />
            <AvatarFallback>{review.user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <strong className="text-sm">{review.title}</strong>
            <small className="text-zinc-400 text-xs">
              {formatDistanceDate(review.created_at)}
            </small>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <img className="rounded-xl" src={review.thumbnail} alt="" />
          <SliderRating ratings={review.ratings} />

          <div className="mt-4 ">
            <div className="flex items-center gap-1">
              <ChatTeardropDots
                size={20}
                weight="fill"
                className="text-zinc-400"
              />
              <span className='text-zinc-300'>
                {review.comments.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
