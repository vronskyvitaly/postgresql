import { prisma } from '@/lib/prismaClient'
import { NextRequest, NextResponse } from 'next/server'

// Добавить задачу
export async function POST(req: NextRequest) {
  const { title, description } = await req.json()
  if (!title)
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  const task = await prisma.task.create({
    data: { title, description },
  })
  return NextResponse.json(task)
}

// Удалить задачу
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id)
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

// Изменить статус задачи
export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json()
  if (typeof id !== 'number' || typeof completed !== 'boolean') {
    return NextResponse.json(
      { error: 'ID and completed are required' },
      { status: 400 }
    )
  }
  const task = await prisma.task.update({
    where: { id },
    data: { completed },
  })
  return NextResponse.json(task)
}

// Получить все задачи
export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(tasks)
}
