import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
// import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { findUserByEmail } from '@/app/db/users'

export const signInSchema = z.object({
  password: z.string().min(3).max(255),
  email: z.email()
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        const parsedCredentials = signInSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const user = await findUserByEmail(email)

          if (!user) return null

          const passwordsMatch = password === user.password
          if (passwordsMatch) {
            return {
              ...user,
              id: user.id.toString()
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await findUserByEmail(session?.user?.email || '')
        return {
          ...session,
          user: {
            ...session.user,
            id: sessionUser?.id?.toString() || ''
          }
        }
      } catch (e) {
        process.env.NODE_ENV === 'development' && console.error('Ошибка при создании сессии пользователя:', e)
      }
      return session
    }
  }
})
