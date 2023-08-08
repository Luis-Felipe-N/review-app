import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: NextResponse,
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
    const error_response = {
      status: 'error',
      message: 'Nenhuma review com este ID foi encontrado',
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const json_response = {
    status: 'success',
    data: {
      review,
    },
  }
  return NextResponse.json(json_response)
}
