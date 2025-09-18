import { Award, BarChart3, Handshake, Target, TrendingUp, Users } from 'lucide-react'

const coreValuesList: any = [
  {
    title: 'Momentum',
    description: 'in business',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-blue-400 to-blue-500'
  },
  {
    title: 'Opportunities',
    description: 'through connection',
    icon: <Target className="w-8 h-8" />,
    color: 'from-indigo-400 to-indigo-500'
  },
  {
    title: 'Determined',
    description: 'leaders',
    icon: <Award className="w-8 h-8" />,
    color: 'from-purple-400 to-purple-500'
  },
  {
    title: 'Engagement',
    description: 'with purpose',
    icon: <Users className="w-8 h-8" />,
    color: 'from-pink-400 to-pink-500'
  },
  {
    title: 'Referrals',
    description: 'that matter',
    icon: <Handshake className="w-8 h-8" />,
    color: 'from-violet-400 to-violet-500'
  },
  {
    title: 'Navigate',
    description: 'success',
    icon: <BarChart3 className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-500'
  }
]

export default coreValuesList
