import industryList from '@/app/lib/constants/navigator/industryList'
import prisma from '@/prisma/client'

const colorPalette = [
  '#10B981', // emerald-500
  '#059669', // emerald-600
  '#06B6D4', // teal-500
  '#0D9488', // teal-600
  '#3B82F6', // blue-500
  '#2563EB', // blue-600
  '#22D3EE', // cyan-400
  '#0891B2' // cyan-600
]

export const adminIndustrySlotFactory = {
  slots: async () => {
    const activeUsers = await prisma.user.findMany({
      where: { membershipStatus: 'ACTIVE' },
      select: { industry: true, name: true } // adjust if your user model uses different fields
    })

    const activeUsersCount = activeUsers.length

    const industryMap = new Map(activeUsers.map((u) => [u.industry, u.name]))

    const industrySlots = industryList.map((industry, index) => {
      const member = industryMap.get(industry) || null
      const filled = Boolean(member)
      const color = colorPalette[index % colorPalette.length] // cycle palette

      return { industry, member, filled, color }
    })

    /**
     * Calculate chapter capacity based on industryDistribution
     * @param industryDistribution - array with `filled` boolean
     * @returns number - percentage 0-100
     */

    const totalSlots = industrySlots?.length
    const filledSlots = industrySlots?.filter((i) => i.filled).length

    const capacityPercent = totalSlots ? (filledSlots / totalSlots) * 100 : 0

    return { industrySlots, capacityPercent, activeUsersCount }
  }
}
