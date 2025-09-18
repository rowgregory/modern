import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from '@/types/user'
import { initialParleyFormState } from '@/app/lib/constants/entities/initialParleyFormState'
import { setOpenAnchorDrawer } from '@/app/redux/features/anchorSlice'
import { initialAnchorFormState } from '@/app/lib/constants/anchor'
import { setOpenTreasureMapDrawer } from '@/app/redux/features/treasureMapSlice'
import { initialTreasureMapFormState } from '@/types/treasure-map'
import { setOpenGrogDrawer } from '@/app/redux/features/grogSlice'
import { Users, Calendar, Anchor, Layers3, Sailboat, Beer, Plus, ChevronDown, LifeBuoy, Coins } from 'lucide-react'
import { setOpenParleyDrawer } from '@/app/redux/features/parleySlice'
import { setOpenAddUserDrawer, setOpenSwabbieDrawer } from '@/app/redux/features/userSlice'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { navigatorInputs, setInputs } from '@/app/redux/features/formSlice'
import { useRouter } from 'next/navigation'
import useSoundEffect from '@/hooks/useSoundEffect'

const actionItems = (
  isAdmin: boolean,
  isGrogUnlocked: boolean | undefined,
  isMusterUnlocked: boolean | undefined,
  isBootyUnlocked: boolean | undefined,
  userId: string
) => [
  {
    action: 'schedule-parley',
    label: 'Schedule Parley',
    icon: Calendar,
    open: setOpenParleyDrawer,
    formName: 'parleyForm',
    initial: { ...initialParleyFormState, requesterId: userId },
    isUnlocked: true
  },
  {
    action: 'create-treasure-map',
    label: 'Send Treasure Map',
    icon: Layers3,
    open: setOpenTreasureMapDrawer,
    formName: 'treasureMapForm',
    initial: { ...initialTreasureMapFormState, giverId: userId },
    isUnlocked: true
  },
  {
    action: 'anchor',
    label: 'Drop Anchor',
    icon: Anchor,
    open: setOpenAnchorDrawer,
    formName: 'anchorForm',
    initial: { ...initialAnchorFormState, giverId: userId },
    isUnlocked: true
  },
  {
    action: 'add-swabbie',
    label: 'Invite Swabbie',
    icon: Sailboat,
    open: setOpenSwabbieDrawer,
    formName: 'swabbieForm',
    initial: {},
    isUnlocked: true
  },
  ...(isAdmin
    ? [
        {
          action: 'add-navigator',
          label: 'Add Navigator',
          icon: Users,
          open: setOpenAddUserDrawer,
          formName: 'navigatorForm',
          initial: navigatorInputs,
          isUnlocked: true
        },
        {
          action: 'launch-grog',
          label: 'Launch Grog',
          icon: Beer,
          open: setOpenGrogDrawer,
          formName: 'grogForm',
          initial: {},
          isUnlocked: isGrogUnlocked,
          lockKey: 'grog'
        },
        {
          action: 'call-muster',
          label: 'Call Muster',
          icon: LifeBuoy,
          open: () => {},
          formName: 'musterForm',
          initial: {},
          isUnlocked: isMusterUnlocked,
          lockKey: 'muster'
        },
        {
          action: 'collect-booty',
          label: 'Collect Booty',
          icon: Coins,
          open: () => {},
          formName: 'bootyForm',
          initial: {},
          isUnlocked: isBootyUnlocked,
          lockKey: 'booty'
        }
      ]
    : [])
]

const ActionButtonWithDropdown = () => {
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user } = useUserSelector() as { user: User }
  const chapter = user?.chapter
  const isAdmin = user?.isAdmin
  const { push } = useRouter()
  const { play } = useSoundEffect('/sound-effects/action-menu.mp3', true)

  const handleActionClick = (item: any) => {
    if (item.isUnlocked) {
      setIsActionsOpen(false)
      dispatch(item.open())
      dispatch(setInputs({ formName: item.formName, data: item.initial }))
    } else {
      push('/admin/hidden-cove')
    }
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          play()
          setIsActionsOpen(!isActionsOpen)
        }}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-500 transition-all flex items-center space-x-2 font-medium shadow-lg text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Actions</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isActionsOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isActionsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
          >
            <div className="py-2">
              {actionItems(
                isAdmin,
                chapter?.hasUnlockedGrog,
                chapter?.hasUnlockedBooty,
                chapter?.hasUnlockedBooty,
                user?.id
              )?.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleActionClick(item)}
                  className="w-full px-4 py-3 text-left text-gray-200 hover:text-white transition-all flex items-center space-x-3 hover:bg-cyan-600/10"
                >
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ActionButtonWithDropdown
