'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500'>
      <h1 className='text-5xl font-bold text-white mb-8'>Добро пожаловать в Task Manager!</h1>
      <p className='text-lg text-white mb-6'>Управляйте своими задачами легко и удобно.</p>
      <div className='flex space-x-4 mb-6'>
        <Button
          className='bg-blue-800 text-white rounded-2xl px-6 py-3 hover:bg-blue-700 transition duration-300'
          variant={'secondary'}
          onClick={() => router.push('/auth/signin')}
        >
          Войти
        </Button>
        <Button
          className='bg-green-600 text-white rounded-2xl px-6 py-3 hover:bg-green-700 transition duration-300'
          onClick={() => router.push('/auth/signup')}
        >
          Регистрация
        </Button>
        <Button
          className='bg-purple-600 text-white rounded-2xl px-6 py-3 hover:bg-purple-700 transition duration-300'
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </Button>
      </div>
    </div>
  )
}
