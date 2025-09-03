import getMeetingTypeIcon from '@/app/lib/utils/parley/getParleyMeetingIconType'
import { IParley } from '@/types/parley'
import { FC } from 'react'
import { useSession } from 'next-auth/react'
import { ArrowDown } from 'lucide-react'
import getParleyStatusColor from '@/app/lib/utils/parley/getParleyStatusColor'
import getParleyStatusIcon from '@/app/lib/utils/parley/getParleyStatusIcon'

const Header: FC<{ parley: IParley }> = ({ parley }) => {
  const session = useSession()
  const isIncomingRequest = parley.recipientId === session.data?.user?.id && parley.status === 'REQUESTED'

  return (
    <div className="space-y-3">
      {/* Incoming Request Banner */}
      {isIncomingRequest && (
        <div className="flex items-center space-x-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <ArrowDown className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 text-sm font-medium">{parley.requester.name} wants to meet with you</span>
        </div>
      )}

      {/* Original Header Content */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getParleyStatusColor(parley.status)}`}
          >
            {getParleyStatusIcon(parley.status)}
            <span>{parley.status.toLowerCase()}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            {getMeetingTypeIcon(parley.meetingType).icon}
            <span> {getMeetingTypeIcon(parley.meetingType).text}</span>
          </div>
          <div className="text-xs text-gray-500">{parley.duration} min</div>
        </div>
        <div className="text-sm text-gray-400">Created {new Date(parley.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default Header
