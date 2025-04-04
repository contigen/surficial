import { loginSchema } from '&/lib/schema'
import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { addWalletToUser, getUser } from '&/lib/db-queries'
import { compare } from 'bcrypt-ts'
import { NextResponse } from 'next/server'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
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
          const wallet = user.wallets.at(-1)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            walletAddress: wallet?.address,
            walletId: wallet?.id,
          }
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
      if (isLoggedIn && pathname.startsWith('/api/auth')) {
        return true
      }
      if (
        isLoggedIn &&
        !auth?.user.walletAddress &&
        pathname !== `/connect-wallet`
      ) {
        return NextResponse.redirect(new URL(`/connect-wallet`, req.url))
      }
      if (isLoggedIn && isAPublicRoute) {
        return NextResponse.redirect(new URL(`/dashboard`, req.url))
      }
      if (isAPublicRoute) {
        return true
      }
      return isLoggedIn
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user }
      }
      if (trigger === `update` && session) {
        const wallet = await addWalletToUser(
          token.id as string,
          session.user.walletAddress
        )
        token = {
          ...token,
          walletAddress: wallet?.address,
          walletId: wallet?.id,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          walletId: token.walletId,
          walletAddress: token.walletAddress,
        },
      }
    },
  },
  pages: {
    signIn: `/auth`,
    newUser: `/dashboard`,
    signOut: `/`,
    error: `/auth`,
  },
})
