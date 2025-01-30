import { loginSchema } from '&/lib/schema'
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { addWalletToUser, getUser } from '&/lib/db-queries'
import { compare } from 'bcrypt-ts'
import { NextResponse } from 'next/server'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    walletId?: string
    walletAddress?: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      walletId?: string
      walletAddress?: string
    } & DefaultSession['user']
  }
}

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
  ],
  callbacks: {
    async authorized({ request: req, auth }) {
      const PUBLIC_ROUTES = [`/`, `/auth`]
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

    async jwt({ token, user, trigger, session }) {
      const userID = user.id
      if (user) {
        return { ...token, ...user }
      }
      if (trigger === `update` && session) {
        console.log(session.walletAddress)
        const wallet = await addWalletToUser(userID!, session.walletAddress)
        return {
          ...token,
          walletAddress: session?.walletAddress,
          walletId: wallet?.id,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  pages: {
    signIn: `/auth`,
    newUser: `/dashboard`,
    signOut: `/`,
    error: `/auth`,
  },
})
