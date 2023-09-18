import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const completeProductFormShema = z.object({
  batch: z.string(),
  link: z.string(),
  description: z.string(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json()
    const review = completeProductFormShema.parse(body)

    const reviewPrisma = await prisma.review.update({
      where: {
        id: params.id,
      },
      data: {
        bacth: review.batch,
        link: review.link,
        description: review.description,
      },
    })

    return NextResponse.json(
      {
        review: reviewPrisma,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    const errorResponse = {
      status: 'error',
      message: 'Não foi possível completar a review',
    }
    return new NextResponse(JSON.stringify(errorResponse), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
