# --- Этап 1: Установка зависимостей ---
FROM node:20-alpine AS installer

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY prisma ./prisma

# Устанавливаем зависимости
RUN npm ci

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN npm ci

# Генерируем Prisma Client после установки зависимостей
RUN npx prisma generate

# Собираем Next.js
RUN npm run build

CMD ["npm", "run", "start"]