import { IParley } from '@/types/parley'
import React, { FC } from 'react'

const OutcomesForCompoletedMeetings: FC<{ parley: IParley }> = ({ parley }) => {
  return (
    <div className="pt-2 border-t border-gray-700">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Meeting Outcomes</p>
      <div className="flex flex-wrap gap-2">
        {parley.referralGiven && (
          <span className="px-2 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded text-xs">
            Referral Given
          </span>
        )}
        {parley.referralReceived && (
          <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded text-xs">
            Referral Received
          </span>
        )}
        {parley.followUpRequired && (
          <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded text-xs">
            Follow-up Required
          </span>
        )}
      </div>
    </div>
  )
}

export default OutcomesForCompoletedMeetings
