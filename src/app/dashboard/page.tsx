'use client'
import { signinOutForm } from '@/actions/auth'
import TaskManager from '@/components/TaskManager'
import { useSession } from 'next-auth/react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [errorMessage, action] = useActionState(signinOutForm, undefined)
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className='flex bg-gray-100 min-h-screen '>
      {/* Боковая панель */}
      <aside className='w-64 bg-blue-700 text-white p-6'>
        <h2 className='text-2xl font-bold mb-6'>Панель навигации</h2>
        <ul>
          <li className='mb-4 hover:text-blue-200'>
            <a onClick={() => router.push('/')}>Главная</a>
          </li>
          <li className='mb-4 hover:text-blue-200'>
            <a href='#'>Задачи</a>
          </li>
          <li className='mb-4 hover:text-blue-200'>
            <a href='#'>Настройки</a>
          </li>
          <li className='mb-4 hover:text-blue-200'>
            <form action={action} className='mb-4'>
              <button type='submit' className='text-red-500 hover:text-red-700'>
                Выйти
              </button>
            </form>
          </li>
        </ul>
      </aside>

      {/* Основной контент */}
      <div className='flex-1 p-8 h-[100vh]'>
        <div className='bg-white shadow-md rounded-lg p-6 h-full '>
          <h1 className='text-3xl font-bold mb-6 text-black'>Добро пожаловать, {session?.user?.name}!</h1>
          <TaskManager />
        </div>
      </div>
    </div>
  )
}
