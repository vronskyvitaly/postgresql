import { prisma } from '@/lib/prismaClient'

export const findUserByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: {
      email
    }
  })
}

export const saveUser = async (name: string, password: string, email: string) => {
  return prisma.user.create({
    data: {
      name,
      password,
      email
    }
  })
}
