import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const ratingFormShema = z.object({
  type: z.string(),
  userId: z.string(),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const body = await request.json()

  try {
    const { type, userId } = ratingFormShema.parse(body)
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    })

    if (!review) {
      const errorResponse = {
        status: 'error',
        message: 'Nenhuma review com este ID foi encontrado',
      }
      return new NextResponse(JSON.stringify(errorResponse), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const rating = await prisma.rating.create({
      data: {
        type,
        review_id: review.id,
        user_id: userId,
      },
    })

    const jsonResponse = {
      status: 'success',
      data: {
        rating,
      },
    }
    return NextResponse.json(jsonResponse)
  } catch (error) {
    const errorResponse = {
      status: 'error',
      message: 'Não foi possível criar uma avaliação',
    }
    return new NextResponse(JSON.stringify(errorResponse), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
