import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  
  const reviews = await prisma.review.findMany({
    where: {
      bacth: {
        not: null
      },
      description: {
        not: null
      }
    },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          avatar_url: true
        }
      },
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
