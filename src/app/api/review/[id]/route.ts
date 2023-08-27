import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  { params }: { params: { id: string } },
) {
  const id = params.id
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          avatar_url: true,
        },
      },
      comments: true,
      ratings: true,
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

  const jsonResponse = {
    status: 'success',
    data: {
      review,
    },
  }
  return NextResponse.json(jsonResponse)
}
