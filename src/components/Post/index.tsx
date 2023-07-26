'use client'

import { Heart } from '@phosphor-icons/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader } from '../ui/card'
import { SliderRating } from './SliderRating'

interface PostProps {
  image: string
}

export function Post({ image }: PostProps) {
  const likes = Array.from(Array(3).keys())

  return (
    <Card className="w-96 rounded-2xl border-zinc-900 hover:border-purple-600 border-2">
      <CardHeader className="flex gap-2 flex-row">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://doodleipsum.com/700/avatar-2?i=de7ef159acaa49833815766098126673" />
          <AvatarFallback>LF</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <strong className="text-sm">NB 2002r protection pack sea salt</strong>
          <small className="text-zinc-400 text-xs">10 minutos atrás</small>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <img className="rounded-xl" src={image} alt="" />

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
  )
}
