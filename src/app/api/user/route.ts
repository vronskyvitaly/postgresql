import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // В продакшене здесь должно быть хеширование пароля
      }
    })

    // Не возвращаем пароль в ответе
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (err) {
    console.error('Error creating user:', err)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
