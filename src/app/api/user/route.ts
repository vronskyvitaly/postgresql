// В файле src/app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // в реальной системе хешируйте пароль!
      }
    })

    return NextResponse.json(user)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}