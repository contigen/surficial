import { loginSchema } from '&/lib/schema'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import LinkedIn from 'next-auth/providers/linkedin'
import { getUser } from '&/lib/db-queries'
import { compare } from 'bcrypt-ts'
import { NextResponse } from 'next/server'

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
      const PUBLIC_ROUTES = [`/`, `/login`, `/register`]
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
  },
  pages: {
    signIn: `/login`,
    newUser: `/dashboard`,
    signOut: `/`,
    error: `/login`,
  },
})
