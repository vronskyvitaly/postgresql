'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, CheckCircle, Circle, Trash2, Calendar, Filter } from 'lucide-react'

interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')
  const { data: session } = useSession()

  // Загрузка задач из базы
  useEffect(() => {
    axios
      .get('/api/task')
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return
    setLoading(true)
    try {
      const res = await axios.post('/api/task', { title: input, userId: Number(session?.user?.id) })
      setTasks([...tasks, res.data])
      setInput('')
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // Изменить статус задачи
  const toggleTask = async (task: Task) => {
    try {
      const res = await axios.patch('/api/task', {
        id: task.id,
        completed: !task.completed
      })
      setTasks(tasks.map(t => (t.id === task.id ? res.data : t)))
    } catch (err) {
      console.log(err)
    }
  }

  // Удалить задачу
  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete('/api/task', { data: { id: taskId } })
      setTasks(tasks.filter(t => t.id !== taskId))
    } catch (err) {
      console.log(err)
    }
  }

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const completedCount = tasks.filter(task => task.completed).length
  const totalCount = tasks.length

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Заголовок */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Менеджер задач</h2>
            <p className="text-sm text-gray-600 mt-1">
              Выполнено {completedCount} из {totalCount} задач
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Фильтр:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все</option>
              <option value="pending">В работе</option>
              <option value="completed">Выполненные</option>
            </select>
          </div>
        </div>
      </div>

      {/* Форма добавления */}
      <div className="p-6 border-b border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Добавить новую задачу..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg px-6 py-3 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={loading}
          >
            <Plus size={16} />
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
        </form>
      </div>

      {/* Прогресс бар */}
      {totalCount > 0 && (
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Прогресс выполнения</span>
            <span>{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Список задач */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <CheckCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">
              {filter === 'all' ? 'Задач пока нет' : 
               filter === 'completed' ? 'Нет выполненных задач' : 
               'Нет задач в работе'}
            </p>
            <p className="text-sm mt-1">
              {filter === 'all' ? 'Добавьте свою первую задачу выше' : 'Попробуйте другой фильтр'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <li
                key={task.id}
                className="p-4 hover:bg-gray-50 transition-colors duration-150 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => toggleTask(task)}
                      className="flex-shrink-0 focus:outline-none"
                    >
                      {task.completed ? (
                        <CheckCircle className="text-green-500 hover:text-green-600" size={20} />
                      ) : (
                        <Circle className="text-gray-400 hover:text-gray-600" size={20} />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block text-sm font-medium ${
                          task.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 ml-4 p-1 text-red-500 hover:text-red-700 transition-all duration-200 focus:outline-none focus:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TaskManager
