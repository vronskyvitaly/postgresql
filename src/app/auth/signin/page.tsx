'use client'

import { authenticate } from '@/actions/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { Suspense } from 'react'

const initialState = { success: undefined, errors: { password: [] } }

// Внешняя компонента, обертка с Suspense
export default function SigninForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerSigninForm />
    </Suspense>
  )
}

// Внутренняя компонента, где вызывается useSearchParams()
function InnerSigninForm() {
  const searchParams = useSearchParams()
  const [state, action, isPending] = useActionState(authenticate, initialState)
  const message = searchParams.get('message')
  const router = useRouter()

  useEffect(() => {
    console.log('state:', state)
    if (state?.success === 'true') {
      router.push('/dashboard')
    }
  }, [state, router])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4'>
      {/* Весь JSX оставьте без изменений */}

      {/* Начинается ваш JSX, который вы прислали, начиная с this комментария */}

      {/* Анимационные фоновые элементы */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
        <div className='absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
      </div>

      {/* Основная форма */}
      <div className='relative w-full max-w-md'>
        {/* Стеклянная карточка */}
        <div className='backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8'>
          {/* Заголовок */}
          <div className='text-center mb-8'>
            <div className='w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                ></path>
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>Добро пожаловать!</h1>
            <p className='text-white/70'>Войдите в свою учетную запись</p>
          </div>

          {/* Сообщение об успешной регистрации */}
          {message === 'registered' && (
            <div className='mb-6 p-4 bg-green-500/20 border border-green-300/50 rounded-xl'>
              <p className='text-green-200 text-sm flex items-center'>
                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
                Регистрация прошла успешно! Теперь вы можете войти в систему.
              </p>
            </div>
          )}

          {/* Форма */}
          <form action={action} className='space-y-6'>
            {/* Поле Email */}
            <div className='relative'>
              <label className='block text-white/80 text-sm font-medium mb-2'>Email адрес</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-white/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    ></path>
                  </svg>
                </div>
                <input
                  type='email'
                  name='email'
                  placeholder='example@email.com'
                  className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm'
                  required
                />
              </div>
            </div>

            {/* Поле Password */}
            <div className='relative'>
              <label className='block text-white/80 text-sm font-medium mb-2'>Пароль</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='h-5 w-5 text-white/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    ></path>
                  </svg>
                </div>
                <input
                  type='password'
                  name='password'
                  placeholder='••••••••'
                  maxLength={36}
                  className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm'
                  required
                />
              </div>
              {state?.errors?.password && (
                <p className='mt-2 text-red-300 text-sm flex items-center'>
                  <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {/* Кнопка входа */}
            <button
              type='submit'
              disabled={isPending}
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg'
            >
              {isPending ? (
                <div className='flex items-center justify-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Входим...
                </div>
              ) : (
                'Войти в аккаунт'
              )}
            </button>
          </form>

          {/* Дополнительные ссылки */}
          <div className='mt-6 text-center'>
            <p className='text-white/60 text-sm'>
              Нет аккаунта?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className='text-blue-300 hover:text-blue-200 transition-colors duration-200 font-medium'
              >
                Зарегистрироваться
              </button>
            </p>
            <p className='text-white/60 text-sm mt-2'>
              <button
                onClick={() => router.push('/')}
                className='text-blue-300 hover:text-blue-200 transition-colors duration-200 font-medium'
              >
                Вернуться на главную
              </button>
            </p>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className='absolute -top-6 -left-6 w-12 h-12 border-4 border-white/20 rounded-full'></div>
        <div className='absolute -bottom-6 -right-6 w-8 h-8 border-4 border-white/20 rounded-full'></div>
      </div>
    </div>
  )
}
