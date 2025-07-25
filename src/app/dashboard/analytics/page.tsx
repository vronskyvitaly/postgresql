'use client'

import DashboardLayout from '@/components/DashboardLayout'
import StatsCard from '@/components/StatsCard'
import { BarChart3, TrendingUp, Clock, Target, Activity } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Заголовок страницы */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <BarChart3 className='text-purple-600' size={24} />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Аналитика и статистика</h1>
              <p className='text-gray-600'>Отслеживайте свою продуктивность и прогресс</p>
            </div>
          </div>
        </div>

        {/* Статистические карточки */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatsCard
            title='Задач в месяц'
            value='127'
            icon={Target}
            change='+12% к прошлому месяцу'
            changeType='positive'
            color='blue'
          />

          <StatsCard
            title='Среднее время'
            value='2.4ч'
            icon={Clock}
            change='−15 мин'
            changeType='positive'
            color='green'
          />

          <StatsCard
            title='Продуктивность'
            value='89%'
            icon={TrendingUp}
            change='+7% за неделю'
            changeType='positive'
            color='purple'
          />

          <StatsCard
            title='Активных дней'
            value='24/30'
            icon={Activity}
            change='Отличный результат!'
            changeType='positive'
            color='orange'
          />
        </div>

        {/* График активности */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Активность по дням недели</h3>
            <div className='space-y-3'>
              {[
                { day: 'Понедельник', value: 85, color: 'bg-blue-500' },
                { day: 'Вторник', value: 92, color: 'bg-green-500' },
                { day: 'Среда', value: 78, color: 'bg-yellow-500' },
                { day: 'Четверг', value: 95, color: 'bg-purple-500' },
                { day: 'Пятница', value: 88, color: 'bg-red-500' },
                { day: 'Суббота', value: 45, color: 'bg-orange-500' },
                { day: 'Воскресенье', value: 32, color: 'bg-gray-500' }
              ].map(item => (
                <div key={item.day} className='flex items-center space-x-3'>
                  <span className='w-20 text-sm text-gray-600'>{item.day}</span>
                  <div className='flex-1 bg-gray-200 rounded-full h-3'>
                    <div className={`h-3 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                  </div>
                  <span className='text-sm font-medium text-gray-900 w-8'>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Категории задач</h3>
            <div className='space-y-4'>
              {[
                { category: 'Работа', count: 45, percentage: 60, color: 'bg-blue-500' },
                { category: 'Личные', count: 22, percentage: 30, color: 'bg-green-500' },
                { category: 'Обучение', count: 8, percentage: 10, color: 'bg-purple-500' }
              ].map(item => (
                <div key={item.category} className='space-y-2'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>{item.category}</span>
                    <span className='text-sm text-gray-500'>{item.count} задач</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Дополнительные метрики */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Тренды производительности</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-green-800'>Лучший день</p>
                  <p className='text-xs text-green-600'>Четверг</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-green-800'>95%</p>
                </div>
              </div>

              <div className='flex items-center justify-between p-3 bg-orange-50 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-orange-800'>Нужно улучшить</p>
                  <p className='text-xs text-orange-600'>Воскресенье</p>
                </div>
                <div className='text-right'>
                  <p className='text-lg font-bold text-orange-800'>32%</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Цели месяца</h3>
            <div className='space-y-4'>
              <div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm text-gray-600'>100 задач</span>
                  <span className='text-sm font-medium'>89/100</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-blue-500 h-2 rounded-full' style={{ width: '89%' }}></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-sm text-gray-600'>25 дней активности</span>
                  <span className='text-sm font-medium'>24/25</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div className='bg-green-500 h-2 rounded-full' style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Последние достижения</h3>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                  <span className='text-yellow-600'>🏆</span>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>Серия из 7 дней</p>
                  <p className='text-xs text-gray-500'>2 дня назад</p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <span className='text-blue-600'>🎯</span>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-900'>100 выполненных задач</p>
                  <p className='text-xs text-gray-500'>неделю назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
