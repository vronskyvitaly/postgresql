'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { useSession } from 'next-auth/react'
import { Settings, User, Bell, Shield, Palette, Globe } from 'lucide-react'

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Заголовок страницы */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <Settings className='text-gray-600' size={24} />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Настройки</h1>
              <p className='text-gray-600'>Управляйте своими предпочтениями и конфигурацией аккаунта</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Основные настройки */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Профиль пользователя */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-3 mb-6'>
                <User className='text-blue-600' size={20} />
                <h2 className='text-lg font-semibold text-gray-900'>Профиль пользователя</h2>
              </div>

              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Имя</label>
                    <input
                      type='text'
                      defaultValue={session?.user?.name || ''}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                    <input
                      type='email'
                      defaultValue={session?.user?.email || ''}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>О себе</label>
                  <textarea
                    rows={3}
                    placeholder='Расскажите немного о себе...'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                  Сохранить изменения
                </button>
              </div>
            </div>

            {/* Уведомления */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-3 mb-6'>
                <Bell className='text-yellow-600' size={20} />
                <h2 className='text-lg font-semibold text-gray-900'>Уведомления</h2>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Email уведомления</p>
                    <p className='text-sm text-gray-500'>Получать уведомления о новых задачах на email</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Push уведомления</p>
                    <p className='text-sm text-gray-500'>Получать push уведомления в браузере</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Еженедельный отчет</p>
                    <p className='text-sm text-gray-500'>Получать сводку по задачам каждую неделю</p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' className='sr-only peer' defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Внешний вид */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-3 mb-6'>
                <Palette className='text-purple-600' size={20} />
                <h2 className='text-lg font-semibold text-gray-900'>Внешний вид</h2>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Тема</label>
                  <select className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option>Светлая</option>
                    <option>Темная</option>
                    <option>Системная</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Размер шрифта</label>
                  <select className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option>Маленький</option>
                    <option>Средний</option>
                    <option>Большой</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Цветовая схема</label>
                  <div className='flex space-x-3'>
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-orange-500'].map(
                      (color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full ${color} ${index === 0 ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className='space-y-6'>
            {/* Безопасность */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-3 mb-4'>
                <Shield className='text-green-600' size={20} />
                <h3 className='text-lg font-semibold text-gray-900'>Безопасность</h3>
              </div>

              <div className='space-y-3'>
                <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <p className='font-medium text-gray-900'>Изменить пароль</p>
                  <p className='text-sm text-gray-500'>Обновите пароль для аккаунта</p>
                </button>

                <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <p className='font-medium text-gray-900'>Двухфакторная аутентификация</p>
                  <p className='text-sm text-gray-500'>Добавьте дополнительный уровень защиты</p>
                </button>

                <button className='w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                  <p className='font-medium text-gray-900'>Активные сессии</p>
                  <p className='text-sm text-gray-500'>Управляйте активными сессиями</p>
                </button>
              </div>
            </div>

            {/* Интеграции */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center space-x-3 mb-4'>
                <Globe className='text-blue-600' size={20} />
                <h3 className='text-lg font-semibold text-gray-900'>Интеграции</h3>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 border border-gray-200 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <span className='text-blue-600 text-sm font-bold'>G</span>
                    </div>
                    <span className='font-medium text-gray-900'>Google Calendar</span>
                  </div>
                  <button className='text-sm text-blue-600 hover:text-blue-700'>Подключить</button>
                </div>

                <div className='flex items-center justify-between p-3 border border-gray-200 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                      <span className='text-purple-600 text-sm font-bold'>S</span>
                    </div>
                    <span className='font-medium text-gray-900'>Slack</span>
                  </div>
                  <button className='text-sm text-blue-600 hover:text-blue-700'>Подключить</button>
                </div>
              </div>
            </div>

            {/* Экспорт данных */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Данные</h3>
              <div className='space-y-3'>
                <button className='w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors'>
                  Экспорт данных
                </button>
                <button className='w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors'>
                  Удалить аккаунт
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
