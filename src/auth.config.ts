import type { NextAuthConfig } from 'next-auth'

export const AUTH_PATH = '/auth'
export const PROTECTED_PATH = '/dashboard'
export const authConfig: NextAuthConfig = {
  trustHost: true,
  secret: 'ssssss333333',
  pages: {
    signIn: '/auth/signin'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith(PROTECTED_PATH)

      if (isOnDashboard) {
        return isLoggedIn
      } else if (isLoggedIn) {
        return Response.redirect(new URL(PROTECTED_PATH, nextUrl))
      }
      return true
    }
  },

  providers: []
} satisfies NextAuthConfig
