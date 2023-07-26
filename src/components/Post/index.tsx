'use client'

import { Review } from '@/@types'
import { getThumbnail } from '@/lib/imgur/getThumbnail'
import { formatDistanceDate } from '@/utils'
import { Heart } from '@phosphor-icons/react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader } from '../ui/card'
import { SliderRating } from './SliderRating'

interface PostProps {
  review: Review
}

export function Post({ review }: PostProps) {
  const likes = Array.from(Array(3).keys())
  // console.log(getThumbnail(review.album_link))
  // useEffect(() => {
  //   axios({  
  //     method: 'get',
  //     url: 'https://api.imgur.com/3/album/IpHd6yc/images',
  //     headers: { 'authorization': 'Client-ID ' + process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID }
  //   }).then((response) => { console.log(response) })
  // }, [])

  return (
    <Link href={`/review/${review.id}/`}>
    <Card className="w-96 rounded-2xl border-zinc-900 hover:border-purple-600 border-2">
      <CardHeader className="flex gap-2 flex-row">
        <Avatar className="w-12 h-12">
          <AvatarImage src={review.user.avatar_url} />
          <AvatarFallback>{ review.user.name.slice(0, 2) }</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <strong className="text-sm">{ review.title }</strong>
          <small className="text-zinc-400 text-xs">{formatDistanceDate(review.created_at)}</small>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <img className="rounded-xl" src={review.thumbnail} alt="" />

        <SliderRating />

        <div className="mt-4">
          <div className="flex items-center gap-1">
            <Heart size={20} weight="fill" className="text-pink-700" />
            <ul className="flex">
              {likes.map((like, index) => (
                <li
                  key={like}
                  style={{
                    transform: `translateX(-${index * 15}px)`,
                  }}
                >
                  <Avatar className="w-8 h-8 border-zinc-950 border-4">
                    <AvatarImage
                      className="object-cover"
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <AvatarFallback>LF</AvatarFallback>
                  </Avatar>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
