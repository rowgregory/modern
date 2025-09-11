import React, { FC } from 'react'
import TopPerformerItem from './TopPerformerItem'

const TopPerformers: FC<{ topPerformers: any }> = ({ topPerformers }) => {
  return (
    <div className="mb-8">
      <h3 className="text-white font-semibold mb-4">Top Performers This Month</h3>
      <div className="space-y-3">
        {topPerformers?.map((performer: { rank: any; name: any; subtitle: any; amount: any; color: any }) => (
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
