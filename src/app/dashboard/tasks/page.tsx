'use client'

import DashboardLayout from '@/components/DashboardLayout'
import TaskManager from '@/components/TaskManager'
import { CheckSquare, Plus, Filter, Search } from 'lucide-react'

export default function TasksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Заголовок страницы */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Управление задачами</h1>
                <p className="text-gray-600">Создавайте, отслеживайте и управляйте своими задачами</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                <span>Фильтры</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={16} />
                <span>Новая задача</span>
              </button>
            </div>
          </div>
        </div>

        {/* Основной контент - TaskManager */}
        <TaskManager />

        {/* Дополнительные инструменты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                📝 Создать задачу из шаблона
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                📊 Экспорт списка задач
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                🔄 Повторяющиеся задачи
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg">
                <span className="text-sm text-gray-700">🔵 Личные</span>
                <span className="text-xs text-gray-500">12</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg">
                <span className="text-sm text-gray-700">🟢 Работа</span>
                <span className="text-xs text-gray-500">8</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg">
                <span className="text-sm text-gray-700">🟡 Проекты</span>
                <span className="text-xs text-gray-500">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Продуктивность</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Выполнение в срок</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}