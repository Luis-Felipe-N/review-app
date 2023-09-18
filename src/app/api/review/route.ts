import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const pageStr = request.nextUrl.searchParams.get('page')
  const limitStr = request.nextUrl.searchParams.get('limit')

  const page = pageStr ? parseInt(pageStr, 10) : 1
  const limit = limitStr ? parseInt(limitStr, 10) : 10
  const skip = (page - 1) * limit

  const reviews = await prisma.review.findMany({
    skip,
    take: limit,
    where: {
      bacth: {
        not: null,
      },
      description: {
        not: null,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          avatar_url: true,
        },
      },
      comments: {
        select: {
          user: {
            select: {
              name: true,
              username: true,
              avatar_url: true,
            },
          },
        },
      },
      ratings: true,
    },
  })

  return NextResponse.json(
    {
      reviews,
    },
    {
      status: 201,
    },
  )
}
