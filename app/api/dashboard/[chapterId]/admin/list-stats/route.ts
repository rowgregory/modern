import { NextRequest, NextResponse } from 'next/server'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceDashboard } from '@/app/lib/constants/api/sliceNames'
import { adminStatCardFactory } from '@/app/lib/utils/api/admin/adminStatCardFactory'
import { adminWeeklyActivityFactory } from '@/app/lib/utils/api/admin/adminWeeklyActivityFactory'
import { adminIndustrySlotFactory } from '@/app/lib/utils/api/admin/adminIndustrySlotFactory'
import { adminSessionFactory } from '@/app/lib/utils/api/admin/adminSessionFactory'

export async function GET(req: NextRequest) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const { totalMembers, totalMembersChange } = await adminStatCardFactory.card.member()
    const { totalRevenue, totalRevenueChange } = await adminStatCardFactory.card.revenue()
    const { conversionChangePercent, conversionRate } = await adminStatCardFactory.card.conversion()
    const { chapterHealth, healthChangePercent } = await adminStatCardFactory.card.health()
    const { memberRetention, retentionChangePercent } = await adminStatCardFactory.card.retention()
    const { parleysChangePercent, totalParleys } = await adminStatCardFactory.card.parley()
    const { anchorsChangePercent, totalAnchors } = await adminStatCardFactory.card.anchor()
    const { totalTreasureMaps, treasureMapsChangePercent } = await adminStatCardFactory.card.treasureMap()

    const { weeklyActivity } = await adminWeeklyActivityFactory.chart()

    const { industrySlots, capacityPercent, activeUsersCount } = await adminIndustrySlotFactory.slots()

    const { participationPercent } = await adminSessionFactory.participation()
    const { buckets } = await adminSessionFactory.engagement()
    const { topPerformers } = await adminSessionFactory.topPerformers()
    const { newApplicationsCount, parleyRequestsCount } = await adminSessionFactory.output()

    return NextResponse.json({
      totalMembers,
      totalMembersChange,
      totalRevenue,
      totalRevenueChange,
      conversionRate: conversionRate.toFixed(1),
      conversionChangePercent: conversionChangePercent.toFixed(1),
      chapterHealth: chapterHealth.toFixed(1),
      healthChangePercent: healthChangePercent.toFixed(1),
      memberRetention: memberRetention.toFixed(1),
      retentionChangePercent: retentionChangePercent.toFixed(1),
      totalParleys,
      parleysChangePercent: parleysChangePercent.toFixed(1),
      totalAnchors,
      anchorsChangePercent: anchorsChangePercent.toFixed(1),
      totalTreasureMaps,
      treasureMapsChangePercent: treasureMapsChangePercent.toFixed(1),
      weeklyActivity,
      industrySlots,
      capacityPercent: capacityPercent.toFixed(1),
      activeUsersCount,
      participationPercent: participationPercent.toFixed(1),
      buckets,
      topPerformers,
      newApplicationsCount,
      parleyRequestsCount
    })
  } catch (error) {
    handleApiError({ error, req, action: 'list admin stats', sliceName: sliceDashboard })
  }
}
