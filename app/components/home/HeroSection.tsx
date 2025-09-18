import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/app/lib/constants/motion'
import LaunchAppButton from '../common/LaunchAppButton'
// import { ChevronDown } from 'lucide-react'

import { useGetUsersQuery } from '@/app/redux/services/userApi'
import { User } from '@/types/user'
import { chapterId } from '@/app/lib/constants/api/chapterId'
import CustomerAvatars from './CustomAvatars'
// import Marquee from 'react-fast-marquee'

const HeroSection: FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const { data } = useGetUsersQuery({ chapterId, membershipStatus: 'ACTIVE' }) as { data: { users: User[] } }

  return (
    <motion.section
      className="py-28 flex flex-col items-center justify-center text-white overflow-hidden relative"
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="absolute top-1/2 -translate-y-1/2 translate-x-4/5  w-96 h-96 opacity-30">
        <div className="w-full h-full bg-teal-500 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 opacity-30">
        <div className="w-full h-full bg-blue-600 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-4/5 w-96 h-96 opacity-30">
        <div className="w-full h-full bg-cyan-500 rounded-full blur-3xl"></div>
      </div>
      {/* Background Color/Gradient to fill gaps */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 z-0"></div> */}

      {/* Overlay for text readability */}
      {/* <div className="absolute inset-0 bg-black/50 z-10"></div> */}
      <CustomerAvatars users={data?.users} totalCount={data?.users?.length} />
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div variants={fadeInUp} className="mb-8 flex items-center justify-center flex-col">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent uppercase drop-shadow-2xl">
            Where business meets <br />
            the horizon
          </h1>
          <div className="mb-8 max-w-md w-full">
            {/* <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent uppercase drop-shadow-2xl"> */}
            Set sail with like-minded entrepreneurs who believe in connection, collaboration, and creating real
            opportunities that lead to lasting growth.
            {/* </span> */}
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <LaunchAppButton />
        </div>
      </div>

      {/* <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <ChevronDown className="w-8 h-8 text-blue-300/60 drop-shadow-sm" />
      </motion.div> */}

      {/* <div className="max-w-screen-xl w-full mt-24">
        <Marquee direction="left" speed={70}>
          <div className="flex items-center gap-x-10 mr-10">
            {.map((value: string, i: number) => (
              <div key={i} className="text-7xl text-gray-950 font-bold uppercase tracking-tight">
                {value}
              </div>
            ))}
          </div>
        </Marquee>
      </div> */}
    </motion.section>
  )
}

export default HeroSection
