'use server'
import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'

interface SigninFormState {
  success?: string
  errors?: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

// Authenticating function for sign-in
export async function authenticate(prevState: SigninFormState | undefined, formData: FormData) {
  console.log('authenticate', formData)
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    return { success: 'true' }
  } catch (error) {
    console.log('authenticate error: ', error)
    // Handling authentication errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: {
              password: ['Invalid credentials.']
            }
          }
        default:
          return {
            errors: {
              password: ['Something went wrong.']
            }
          }
      }
    }
    throw error
  }
}

export async function signinOutForm(prevState: SigninFormState | undefined) {
  try {
    await signOut({ redirectTo: '/' })
  } catch (error) {
    // Check if it's a Next.js redirect (expected behavior)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      // This is expected - don't log as error
      throw error
    }
    
    console.log('authenticate error: ', error)
    // Handling authentication errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            errors: {
              password: ['Invalid credentials.']
            }
          }
        default:
          return {
            errors: {
              password: ['Something went wrong.']
            }
          }
      }
    }
    throw error
  }
}
