import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  color = 'blue' 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  }

  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${changeColorClasses[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}