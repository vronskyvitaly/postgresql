'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

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

  return (
    <div className='flex-1 p-8 h-full'>
      <div className='bg-white rounded-lg shadow-md p-6 text-black'>
        <h2 className='text-xl font-semibold mb-4 text-black'>Добавить задачу</h2>
        <form onSubmit={handleSubmit} className='flex mb-4'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Введите задачу...'
            className='flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={loading}
          />
          <button
            type='submit'
            className='bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-150'
            disabled={loading}
          >
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
        </form>
        <ul className='max-h-150 overflow-y-auto'>
          {tasks.map(task => (
            <li
              key={task.id}
              className='flex items-center justify-between p-2 border-b border-gray-200 hover:bg-gray-50 transition duration-150'
            >
              <div className='flex items-center'>
                <input type='checkbox' checked={task.completed} onChange={() => toggleTask(task)} className='mr-2' />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskManager
