'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'
import StatsCard from '@/components/StatsCard'
import TaskManager from '@/components/TaskManager'
import { CheckSquare, Clock, TrendingUp, Users, Activity, Calendar, Target } from 'lucide-react'

interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/task')
      .then(res => {
        setTasks(res.data)
        setLoading(false)
      })
      .catch(() => {
        setTasks([])
        setLoading(false)
      })
  }, [])

  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.filter(task => !task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Задачи за последнюю неделю
  const lastWeekTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return taskDate >= weekAgo
  }).length

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Приветствие */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>Добро пожаловать, {session?.user?.name || 'Пользователь'}! 👋</h1>
              <p className='text-blue-100 text-lg'>Сегодня отличный день для продуктивности</p>
            </div>
            <div className='hidden md:block'>
              <div className='text-right'>
                <p className='text-blue-100 text-sm'>Сегодня</p>
                <p className='text-2xl font-bold'>
                  {new Date().toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatsCard
            title='Всего задач'
            value={loading ? '...' : totalTasks}
            icon={CheckSquare}
            change={`+${lastWeekTasks} за неделю`}
            changeType='positive'
            color='blue'
          />

          <StatsCard
            title='Выполнено'
            value={loading ? '...' : completedTasks}
            icon={Target}
            change={`${completionRate}% завершено`}
            changeType='positive'
            color='green'
          />

          <StatsCard
            title='В работе'
            value={loading ? '...' : pendingTasks}
            icon={Clock}
            change={pendingTasks > 0 ? 'Требуют внимания' : 'Все готово!'}
            changeType={pendingTasks > 0 ? 'neutral' : 'positive'}
            color='orange'
          />

          <StatsCard
            title='Эффективность'
            value={loading ? '...' : `${completionRate}%`}
            icon={TrendingUp}
            change={completionRate >= 70 ? 'Отличная работа!' : 'Можно лучше'}
            changeType={completionRate >= 70 ? 'positive' : 'neutral'}
            color='purple'
          />
        </div>

        {/* Основной контент */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Менеджер задач */}
          <div className='lg:col-span-2'>
            <TaskManager />
          </div>

          {/* Боковая панель с дополнительной информацией */}
          <div className='space-y-6'>
            {/* Быстрые действия */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Быстрые действия</h3>
              <div className='space-y-3'>
                <button className='w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors'>
                  <Calendar className='text-blue-500' size={20} />
                  <span className='text-gray-700'>Запланировать встречу</span>
                </button>
                <button className='w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors'>
                  <Activity className='text-green-500' size={20} />
                  <span className='text-gray-700'>Посмотреть отчеты</span>
                </button>
                <button className='w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors'>
                  <Users className='text-purple-500' size={20} />
                  <span className='text-gray-700'>Пригласить команду</span>
                </button>
              </div>
            </div>

            {/* Активность */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Недавняя активность</h3>
              <div className='space-y-4'>
                {loading ? (
                  <div className='text-center text-gray-500 py-4'>Загрузка...</div>
                ) : (
                  tasks.slice(0, 3).map(task => (
                    <div key={task.id} className='flex items-start space-x-3'>
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${task.completed ? 'bg-green-500' : 'bg-orange-500'}`}
                      ></div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>{task.title}</p>
                        <p className='text-xs text-gray-500'>{new Date(task.createdAt).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                  ))
                )}

                {tasks.length === 0 && !loading && (
                  <div className='text-center text-gray-500 py-4'>Пока нет активности</div>
                )}
              </div>
            </div>

            {/* Советы */}
            <div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>💡 Совет дня</h3>
              <p className='text-sm text-gray-700'>
                Разбивайте большие задачи на маленькие подзадачи. Это поможет вам оставаться мотивированными и
                отслеживать прогресс!
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
