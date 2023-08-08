import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const page_str = request.nextUrl.searchParams.get('page')
  const limit_str = request.nextUrl.searchParams.get('limit')

  const page = page_str ? parseInt(page_str, 10) : 1
  const limit = limit_str ? parseInt(limit_str, 10) : 10
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
        }
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
