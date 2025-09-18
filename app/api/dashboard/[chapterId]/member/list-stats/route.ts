import { NextRequest, NextResponse } from 'next/server'
import { getUserFromHeader } from '@/app/lib/utils/api/getUserFromheader'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import { sliceDashboard } from '@/app/lib/constants/api/sliceNames'
import { memberWeeklyActivityFactory } from '@/app/lib/utils/api/member/memberWeeklyActivityFactory'
import { memberSessionFactory } from '@/app/lib/utils/api/member/memberSessionFactory'
import { memberStatCardFactory } from '@/app/lib/utils/api/member/memberStatCardFactory'

export async function GET(req: NextRequest) {
  try {
    const userAuth = getUserFromHeader({ req })

    if (!userAuth.success) {
      return userAuth.response!
    }

    const id = userAuth.userId as string

    const { totalRevenue, totalRevenueChange } = await memberStatCardFactory.card.revenue(id)
    const { parleysChangePercent, totalParleys } = await memberStatCardFactory.card.parley(id)
    const { anchorsChangePercent, totalAnchors } = await memberStatCardFactory.card.anchor(id)
    const { totalTreasureMaps, treasureMapsChangePercent } = await memberStatCardFactory.card.treasureMap(id)

    const { weeklyActivity } = await memberWeeklyActivityFactory.chart(id)

    const { participationPercent } = await memberSessionFactory.participation(id)
    const { engagementPercent } = await memberSessionFactory.engagement(id)
    const {
      parleys,
      totalRequestedParleyCountThisMonth,
      totalGivenTreasureMapCountThisMonth,
      totalClosedAnchorCountThisMonth
    } = await memberSessionFactory.output(id)

    return NextResponse.json({
      totalRevenue,
      totalRevenueChange,
      totalParleys,
      parleysChangePercent: parleysChangePercent,
      totalAnchors,
      anchorsChangePercent: anchorsChangePercent,
      totalTreasureMaps,
      treasureMapsChangePercent: treasureMapsChangePercent,
      weeklyActivity,
      participationPercent: participationPercent,
      engagementPercent: engagementPercent,
      parleys,
      totalRequestedParleyCountThisMonth,
      totalGivenTreasureMapCountThisMonth,
      totalClosedAnchorCountThisMonth
    })
  } catch (error) {
    handleApiError({ error, req, action: 'list admin stats', sliceName: sliceDashboard })
  }
}
