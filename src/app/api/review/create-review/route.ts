import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const preProductFormShema = z.object({
  name: z.string(),
  price: z.number(),
  weight: z.number(),
  userId: z.string(),
  albumLink: z.string(),
})

export async function POST(request: NextRequest, res: NextResponse) {
  const body = await request.json()
  const { name, price, weight, userId, albumLink } = preProductFormShema.parse(body)

  const review = await prisma.review.create({
    data: {
      title: name, 
      price, 
      weight,
      user_id: userId,
      album_link: albumLink
    },
  })

  return NextResponse.json(
    {
      review,
    },
    {
      status: 201,
    },
  )
}
