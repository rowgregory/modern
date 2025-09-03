import React from 'react'
import TopPerformerItem from './TopPerformerItem'

const topPerformers = [
  {
    name: 'Jennifer Adams',
    subtitle: '8 deals • 15 F2F meetings',
    amount: '$125,000',
    rank: '1',
    color: 'bg-blue-600'
  },
  {
    name: 'Mike Chen',
    subtitle: '6 deals • 12 F2F meetings',
    amount: '$98,000',
    rank: '2',
    color: 'bg-violet-600'
  },
  {
    name: 'Robert Taylor',
    subtitle: '5 deals • 14 F2F meetings',
    amount: '$87,000',
    rank: '3',
    color: 'bg-green-600'
  },
  {
    name: 'Lisa Rodriguez',
    subtitle: '5 deals • 11 F2F meetings',
    amount: '$76,000',
    rank: '4',
    color: 'bg-pink-600'
  },
  {
    name: 'James Wilson',
    subtitle: '4 deals • 9 F2F meetings',
    amount: '$65,000',
    rank: '5',
    color: 'bg-orange-600'
  }
]

const TopPerformers = () => {
  return (
    <div className="mb-8">
      <h3 className="text-white font-semibold mb-4">Top Performers This Month</h3>
      <div className="space-y-3">
        {topPerformers.map((performer) => (
          <TopPerformerItem
            key={performer.rank}
            name={performer.name}
            subtitle={performer.subtitle}
            amount={performer.amount}
            rank={performer.rank}
            color={performer.color}
          />
        ))}
      </div>
    </div>
  )
}

export default TopPerformers
