'use client'
import axios from 'axios'
import React, { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

export const UserCreateForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdUser, setCreatedUser] = useState<User | null>(null)

  const handleCreateUser = async () => {
    if (!name || !email || !password) return
    setLoading(true)
    try {
      const res = await axios.post('/api/user', { name, email, password })
      setCreatedUser(res.data)
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.error(err)
      alert('Ошибка при создании пользователя')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Создать пользователя</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type='text'
          placeholder='Имя'
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleCreateUser} disabled={loading}>
          {loading ? 'Создание...' : 'Создать пользователя'}
        </button>
      </div>
      {createdUser && (
        <div style={{ marginTop: 16 }}>
          <h3>Создан пользователь:</h3>
          <p>ID: {createdUser.id}</p>
          <p>Имя: {createdUser.name}</p>
          <p>Email: {createdUser.email}</p>
        </div>
      )}
    </div>
  )
}

export default UserCreateForm