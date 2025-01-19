import { loginSchema } from './lib/schema'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import LinkedIn from 'next-auth/providers/linkedin'
import { createUser, getUser } from '&/lib/db-queries'
import { compare } from 'bcrypt-ts'
import { NextResponse } from 'next/server'
import prisma from './lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = await loginSchema.parseAsync(credentials)

        try {
          const user = await getUser(email)
          if (!user) return null
          const isSamePassword = await compare(password, user.password!)
          if (!isSamePassword) return null
          const { id, name, email: userEmail } = user
          return { id, name, email: userEmail }
        } catch {
          return null
        }
      },
    }),
    Google,
    LinkedIn,
  ],
  callbacks: {
    async authorized({ request: req, auth }) {
      const PUBLIC_ROUTES = [
        `/`,
        `/login`,
        `/signup`,
        `/forgot-password`,
        `/candidate/profile`,
      ]
      const { pathname } = req.nextUrl
      const isLoggedIn = !!auth?.user
      const isAPublicRoute = PUBLIC_ROUTES.some(route => route === pathname)
      if (isAPublicRoute) {
        return true
      }
      if (!isLoggedIn) return false
      if (isLoggedIn && isAPublicRoute) {
        return NextResponse.redirect(new URL(`/dashboard`, req.url))
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
    async signIn({ user, account }) {
      const provider = account?.provider
      const providerAccountId = account?.providerAccountId

      if (provider !== `credentials`) {
        if (!provider || !providerAccountId) {
          console.error(`Missing provider or providerAccountId`)
          return false
        }

        const { email, name } = user
        if (!email || !name) {
          console.error(`Missing email or name from OAuth provider`)
          return false
        }

        try {
          const userFromDB = await getUser(email)
          if (!userFromDB) {
            const newUser = await createUser({
              name,
              email,
              providerDetails: { provider, providerAccountId },
            })
            if (!newUser) {
              return false
            }
            return true
          }

          const linkedAccount = await prisma.authAccount.findFirst({
            where: {
              provider,
              providerAccountId,
            },
          })

          if (!linkedAccount) {
            await prisma.authAccount.create({
              data: {
                provider,
                providerAccountId,
                userId: userFromDB.id,
              },
            })
          }

          return true
        } catch {
          return false
        }
      }

      return true
    },
  },
  pages: {
    signIn: `/login`,
    newUser: `/dashboard`,
    signOut: `/`,
    error: `/login`,
  },
})
