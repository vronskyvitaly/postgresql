'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, ChartBarIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: CheckCircleIcon,
      title: 'Умное управление задачами',
      description: 'Организуйте работу с помощью интуитивно понятного интерфейса и автоматизации'
    },
    {
      icon: ChartBarIcon,
      title: 'Аналитика производительности',
      description: 'Отслеживайте прогресс и анализируйте эффективность с детальными отчетами'
    },
    {
      icon: UserGroupIcon,
      title: 'Командная работа',
      description: 'Совместная работа над проектами с возможностью делегирования задач'
    },
    {
      icon: BoltIcon,
      title: 'Быстрая синхронизация',
      description: 'Мгновенные обновления и синхронизация между всеми устройствами'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 w-full h-full'>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
        <div className='absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
      </div>

      {/* Hero Section */}
      <section className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center'>
        <div className='max-w-4xl mx-auto'>
          <div className='animate-slide-in'>
            <h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight'>
              Управляй задачами
              <span className='block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                будущего
              </span>
            </h1>
          </div>

          <div className='animate-slide-in animation-delay-200'>
            <p className='text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed'>
              Революционный подход к управлению задачами с искусственным интеллектом, современным дизайном и
              безграничными возможностями
            </p>
          </div>
          <div className='animate-slide-in animation-delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
            <Button
              className='group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden'
              onClick={() => router.push('/auth/signin')}
            >
              <span className='relative z-10'>Начать работу</span>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </Button>

            <Button
              className='group px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105'
              variant='secondary'
              onClick={() => router.push('/dashboard')}
            >
              Открыть Dashboard
            </Button>
          </div>

          {/* Stats Section */}
          <div className='animate-slide-in animation-delay-600 grid grid-cols-3 gap-8 max-w-md mx-auto'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-1'>10K+</div>
              <div className='text-sm text-gray-400'>Активных пользователей</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-1'>99.9%</div>
              <div className='text-sm text-gray-400'>Время работы</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white mb-1'>24/7</div>
              <div className='text-sm text-gray-400'>Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='relative z-10 py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>Почему выбирают нас?</h2>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
              Современные инструменты и технологии для максимальной продуктивности
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-slide-in'
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <feature.icon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
                <p className='text-gray-400 leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative z-10 py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10'>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>Готовы повысить продуктивность?</h3>
            <p className='text-xl text-gray-300 mb-8'>
              Присоединяйтесь к тысячам пользователей, которые уже оптимизировали свою работу
            </p>
            <Button
              className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
              onClick={() => router.push('/auth/signin')}
            >
              Начать бесплатно
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
