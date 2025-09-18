import React, { FC } from 'react'
import TopPerformerItem from './TopPerformerItem'
import TooltipWrapper from '../../common/TooltipWrapper'
import { MoreHorizontal } from 'lucide-react'

const TopPerformers: FC<{ topPerformers: any }> = ({ topPerformers }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold ">Top Performers This Month</h3>
        <TooltipWrapper
          tooltip={`Top Performers are ranked by their total engagement score, which is calculated by adding together all their activity across the platform: Treasure Maps given + Treasure Maps received + Parleys requested + Parleys received + Anchors given. Each activity counts as 1 point toward the engagement score. Members are then sorted by this total score and the top 5 are displayed. The revenue amount shown represents the total business value from all anchors that member has given. This ranking reflects overall platform participation rather than just individual performance metrics.`}
        >
          <MoreHorizontal className="text-gray-400 text-sm font-medium" />
        </TooltipWrapper>
      </div>
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
