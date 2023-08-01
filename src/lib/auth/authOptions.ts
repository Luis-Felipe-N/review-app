import { NextAuthOptions, User } from 'next-auth'

import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../prisma'
import email from 'next-auth/providers/email'
import { PrismaAdapter } from '../prisma/adapter'

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        })

        if (!user) {
          return null
        }

        const passwordIsCorrect = await compare(
          credentials.password,
          user.password,
        )

        if (passwordIsCorrect) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            password: user.password,
            email: user.email || '',
            emailVerified: null,
            avatar_url: user.avatar_url || '',
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      const userPrisma = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      })

      if (userPrisma) {
        const userSession: User = {
          ...session.user,
          id: userPrisma.id,
          name: userPrisma.name,
          username: userPrisma.username,
          avatar_url: userPrisma?.avatar_url || '',
          email: userPrisma?.email || '',
        }
        session.user = userSession
        return session
      }

      const userSession: User = {
        ...session.user,
        id: token.sub!,
      }
      session.user = userSession
      return session
    },
  },
}
