'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
      const res = await axios.post('/api/task', { title: input })
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
    <div
      style={{
        maxWidth: 400,
        margin: '2rem auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8
      }}
    >
      <h2>Добавить задачу</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Введите задачу...'
          style={{ flex: 1, padding: 8 }}
          disabled={loading}
        />
        <button type='submit' style={{ padding: '8px 16px' }} disabled={loading}>
          {loading ? 'Добавление...' : 'Добавить'}
        </button>
      </form>
      <ul style={{ marginTop: 24 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <input type='checkbox' checked={task.completed} onChange={() => toggleTask(task)} />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskManager
