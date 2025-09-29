import React, { FC, useState } from 'react'
import { Users, Calendar, ExternalLink, Heart, Share2, Music, Tv, Globe, Award, Play } from 'lucide-react'
import { User } from '@/types/user'
import { motion } from 'framer-motion'

const badges = [
  { icon: Award, color: 'bg-red-500' },
  { icon: Play, color: 'bg-blue-500' },
  { icon: Music, color: 'bg-purple-500' },
  { icon: Tv, color: 'bg-green-500' },
  { icon: Globe, color: 'bg-yellow-500' },
  { icon: Users, color: 'bg-teal-500' },
  { icon: Calendar, color: 'bg-pink-500' },
  { icon: ExternalLink, color: 'bg-indigo-500' },
  { icon: Heart, color: 'bg-red-400' },
  { icon: Share2, color: 'bg-orange-500' }
]

const LeftSidebar: FC<{ user: User | null; session: any; push: any }> = ({ user, session, push }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="lg:col-span-1">
      {/* Profile Intro */}
      {(user?.bio ||
        (user?.skills?.length && user.skills.length > 0) ||
        (user?.interests?.length && user.interests.length > 0) ||
        (user?.learningGoals?.length && user.learningGoals.length > 0) ||
        user?.facebookUrl ||
        user?.xUrl ||
        user?.threadsUrl ||
        user?.linkedInUrl ||
        user?.youtubeUrl) && (
        <div className="bg-slate-800 rounded-xl p-6 mb-6 shadow-lg border border-slate-700">
          <h3 className="font-bold text-lg mb-4">Profile Intro</h3>
          <div className="space-y-4 text-sm">
            {user?.bio && (
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">About Me:</h4>
                <p className="text-slate-400 leading-relaxed">{user?.bio}</p>
              </div>
            )}
            {user?.skills.length !== undefined && user?.skills.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Skills:</h4>
                <div className="flex flex-wrap">
                  {user?.skills?.map((skill: string, i: number, arr: any[]) => (
                    <p key={i} className="text-slate-400">
                      {skill}
                      {i < arr.length - 1 && ','}&nbsp;
                    </p>
                  ))}
                </div>
              </div>
            )}
            {user?.interests?.length !== undefined && user?.interests?.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Interests:</h4>
                <div className="flex flex-wrap">
                  {user?.interests?.map((interest: string, i: number, arr: any[]) => (
                    <p key={i} className="text-slate-400">
                      {interest}
                      {i < arr.length - 1 && ','}&nbsp;
                    </p>
                  ))}
                </div>
              </div>
            )}
            {user?.learningGoals?.length !== undefined && user?.learningGoals?.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Learning Goals:</h4>
                <div className="flex flex-wrap">
                  {user?.learningGoals?.map((learningGoal: string, i: number, arr: any[]) => (
                    <p key={i} className="text-slate-400">
                      {learningGoal}
                      {i < arr.length - 1 && ','}&nbsp;
                    </p>
                  ))}
                </div>
              </div>
            )}
            {user?.facebookUrl !== null &&
              user?.xUrl !== null &&
              user?.threadsUrl !== null &&
              user?.linkedInUrl !== null &&
              user?.youtubeUrl !== null && (
                <div>
                  <h4 className="font-semibold text-slate-300 mb-2">Other Social Networks:</h4>
                  <div className="space-y-2">
                    {user?.facebookUrl && (
                      <a
                        href={user?.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded text-xs font-medium transition-colors"
                      >
                        Facebook
                      </a>
                    )}

                    {user?.threadsUrl && (
                      <a
                        href={user?.threadsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-black hover:bg-black text-white text-center py-2 rounded text-xs font-medium transition-colors"
                      >
                        Threads
                      </a>
                    )}

                    {user?.linkedInUrl && (
                      <a
                        href={user?.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-blue-700 hover:bg-blue-800 text-white text-center py-2 rounded text-xs font-medium transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}

                    {user?.youtubeUrl && (
                      <a
                        href={user?.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded text-xs font-medium transition-colors"
                      >
                        YouTube
                      </a>
                    )}
                    {user?.xUrl && (
                      <a
                        href={user?.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-black hover:bg-black text-white text-center py-2 rounded text-xs font-medium transition-colors"
                      >
                        X
                      </a>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/*  Badges */}
      {session.data?.user?.id && (
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6 shadow-lg border border-slate-700/50 opacity-60">
          <h3 className="font-bold text-lg mb-4 text-gray-500">{user?.name}&apos;s Badges</h3>
          <div className="grid grid-cols-5 gap-3">
            {badges.map((Badge, index) => (
              <motion.div
                onClick={() => (session.data?.user.isAdmin ? push('/admin/hidden-cove') : push('/member/hidden-cove'))}
                key={index}
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 duration-300"
              >
                <Badge.icon className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>

          {/* Optional: Add a "Coming Soon" or "Unlock Badges" overlay */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 italic">Coming Soon</span>
          </div>
        </div>
      )}

      {/* Podcasts */}
      {user?.podcasts?.length !== undefined && user?.podcasts?.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h3 className="font-bold text-lg mb-6">My Podcasts</h3>
          <div className="space-y-6">
            {user?.podcasts?.map((podcast: any, index: number) => {
              const description = podcast.description || podcast.details
              const shouldTruncate = description?.length > 60
              const truncatedText = description?.slice(0, 60) + '...'

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-700/50 rounded-lg p-6 hover:bg-slate-700 cursor-pointer transition-all border border-slate-600/50"
                >
                  <div className="space-y-2">
                    {/* Title with wrapped icon */}
                    <div className="relative">
                      <h4 className="font-semibold text-white text-lg leading-tight">{podcast.name}</h4>
                      <div className="clear-both"></div>
                    </div>

                    {/* Description - full width */}
                    <div>
                      <p className="text-sm text-slate-300">
                        {isExpanded || !shouldTruncate ? description : truncatedText}
                      </p>

                      {shouldTruncate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsExpanded(!isExpanded)
                          }}
                          className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeftSidebar
