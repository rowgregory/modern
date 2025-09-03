import { formatDateTime } from '@/app/lib/utils/date/formatDate'
import { IParley } from '@/types/parley'
import { Calendar, MapPin } from 'lucide-react'
import React, { FC } from 'react'

const MeetingDetails: FC<{ parley: IParley }> = ({ parley }) => {
  const scheduledDate = formatDateTime(parley.scheduledAt)
  const completedDate = parley.completedAt ? formatDateTime(parley.completedAt) : null
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
      <div className="flex items-center space-x-2 text-gray-300">
        <Calendar className="w-4 h-4 text-violet-400" />
        <span>
          {parley.status === 'COMPLETED' && completedDate
            ? `Completed: ${completedDate}`
            : `Scheduled: ${scheduledDate}`}
        </span>
      </div>
      {parley.location && (
        <div className="flex items-center space-x-2 text-gray-300">
          <MapPin className="w-4 h-4 text-violet-400" />
          <span className="truncate">{parley.location}</span>
        </div>
      )}
    </div>
  )
}

export default MeetingDetails
