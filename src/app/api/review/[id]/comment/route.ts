import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ratingFormShema = z.object({
  content: z.string(),
  userId: z.string(),
})

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id
  const body = await request.json()

  try {
    const { content, userId } = ratingFormShema.parse(body)
    const review = await prisma.review.findUnique({
      where: {
        id,
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

    const rating = await prisma.comment.create({
      data: {
        content,
        review_id: review.id,
        user_id: userId,
      },
    })

    const json_response = {
      status: 'success',
      data: {
        rating,
      },
    }
    return NextResponse.json(json_response)
  } catch (error) {
    const error_response = {
      status: 'error',
      message: 'Não foi possível adicionar um comentário',
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const page_str = request.nextUrl.searchParams.get("page");
  const limit_str = request.nextUrl.searchParams.get("limit");
  const id = params.id

  const page = page_str ? parseInt(page_str, 10) : 1;
  const limit = limit_str ? parseInt(limit_str, 10) : 10;
  const skip = (page - 1) * limit;

  console.log(id, page, limit)

  const comments = await prisma.comment.findMany({
    skip,
    take: limit,
    select: {
      user: {
        select: {
          name: true,
          username: true,
          avatar_url: true,
        },
      },
      replys: true,
      created_at: true,
      content: true
    },
    where: {
      review_id: id
    },
    orderBy: {
      created_at: "desc"
    }
  });

  let json_response = {
    status: "success",
    results: comments.length,
    comments,
  };
  return NextResponse.json(json_response);
}
