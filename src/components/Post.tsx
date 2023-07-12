'use client'

import { Heart } from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

export function Post() {
  const likes = Array.from(Array(4).keys())

  return (
    <div className='bg-zinc-900 car p-8 rounded-xl flex  gap-4'>
    <Avatar className='w-14 h-14'>
      <AvatarImage src="https://doodleipsum.com/700/avatar-2?i=de7ef159acaa49833815766098126673" />
      <AvatarFallback>LF</AvatarFallback>
    </Avatar>

    <div className='flex flex-col gap-2'>
      <div>
        <strong>Luis Felipe Nunes</strong>
        <small className='block text-zinc-400'>15 minutos atrás</small>
      </div>
      <div>
        <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi impedit assumenda ex est? Sint perspiciatis rerum impedit accusamus officiis, non quaerat quo consequatur cumque fuga nesciunt molestias, praesentium, saepe voluptatum.</p>
        <img className='rounded-xl' src="https://i.imgur.com/pMLpL8G.jpeg" alt="" />
      </div>

      <div className="flex justify-between w-full">
        <strong>comments</strong>

        <div className="flex items-center">
          <ul className="flex">
            { likes.map((like, index) => (
              <li key={like} style={{transform: `translateX(${likes.length - (index + 1) * 15}px)`}}>
              <Avatar className='w-8 h-8 border-zinc-900 border-4'>
                <AvatarImage className="object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <AvatarFallback>LF</AvatarFallback>
              </Avatar>
            </li>
            ))}
          </ul>
            <Button size="sm" className="font-bold bg-pink-700 hover:bg-pink-800 rounded-xl space-x-2"><Heart size={14} weight="bold" /><span>4 Likes</span></Button>
        </div>      
      </div>

    </div>
  </div>
  )
}