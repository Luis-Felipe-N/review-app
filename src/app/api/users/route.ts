import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

interface CreateUserProps {
  name: string
  avatar_url: string
  username: string
  password: string
}

export async function POST(request: NextRequest, res: NextResponse) {
  const { name, avatar_url, password, username }: CreateUserProps =
    await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      {
        message: 'Username already taken.',
      },
      {
        status: 400,
      },
    )
  }

  const passwordEncrypted = await hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      avatar_url,
      username,
      password: passwordEncrypted,
    },
  })

  return NextResponse.json(
    {
      user,
    },
    {
      status: 201,
    },
  )
}
