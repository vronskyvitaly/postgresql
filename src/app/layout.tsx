import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Task Manager - Управляй задачами будущего',
  description:
    'Революционный подход к управлению задачами с искусственным интеллектом, современным дизайном и безграничными возможностями. Повысьте свою продуктивность уже сегодня!',
  keywords: 'task manager, управление задачами, продуктивность, планирование, организация, AI, искусственный интеллект',
  authors: [{ name: 'Task Manager Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Task Manager - Управляй задачами будущего',
    description: 'Революционный подход к управлению задачами с современным дизайном и безграничными возможностями',
    type: 'website',
    locale: 'ru_RU'
  }
}

export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
