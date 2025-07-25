'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signinOutForm } from '@/actions/auth'
import { useActionState } from 'react'
import {
  Home,
  CheckSquare,
  Settings,
  LogOut,
  User,
  BarChart3,
  Calendar,
  Bell
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: any
}

const navItems: NavItem[] = [
  { name: 'Главная', href: '/dashboard', icon: Home },
  { name: 'Задачи', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Аналитика', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Календарь', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Уведомления', href: '/dashboard/notifications', icon: Bell },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings }
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [errorMessage, action] = useActionState(signinOutForm, undefined)

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.name || 'Пользователь'}
            </p>
            <p className="text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <form action={action}>
          <button
            type="submit"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Выйти</span>
          </button>
        </form>
      </div>
    </aside>
  )
}