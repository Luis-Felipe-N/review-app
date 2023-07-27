// 'use client'

import { Review } from "@/@types";
import { api } from "@/lib/api";
import { imgur } from "@/lib/imgur";
import { getAlbum } from "@/lib/imgur/getAlbum";
import { prisma } from "@/lib/prisma"
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import Image from "next/image";

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
    return new Error(error.response.data.message) 
  }
}

export default async function Review({params}: ReviewProps) {
  
  const review = await getReview(params.id)

  if (review instanceof Error) {
    return (
      <div>
        {review.message}
      </div>
    )
  }

  const album = await getAlbum(review.album_link)

  return (
    <div className="flex container mx-auto min-h-full  justify-center py-12 gap-4">
      <div className="w-full">
        <ul>
          { album.images.map(image => (
            <li>
              <img
                src={image.link}
                alt=""
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
        <div className="p-4 mt-4 bg-zinc-900 rounded-xl">
          <h1 className="text-xl">{review.title}</h1>
          <div className="mt-4">
            <strong>Comentário sobre o produto</strong>
            <p className="text-zinc-200">{review.description}</p>
          </div>
          <div>
            <button>
              Gostei
            </button>
            <button>
              Gostei
            </button>
          </div>
        </div>
      </div>
      <div className="w-96">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
    </div>
  )
}