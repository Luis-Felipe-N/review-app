import { getAlbum } from '@/lib/imgur/getAlbum'
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
  try {
    const body = await request.json()
    const { name, price, weight, userId, albumLink } =
      preProductFormShema.parse(body)
  
    const album = await getAlbum(albumLink)

    if ((album instanceof Error) || album.images.length <= 0 ) {
      throw new Error('Parece que o link do álbum está quebrado. Por favor, tente inserir outro.')
    }

    const thumbnail = album.images[0].link      

    const review = await prisma.review.create({
      data: {
        title: name,
        price,
        weight,
        user_id: userId,
        album_link: albumLink,
        thumbnail,
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
  } catch (error) {
    console.log(error)

    const error_response = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Não foi possível criar uma review',
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
