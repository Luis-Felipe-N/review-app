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
}
