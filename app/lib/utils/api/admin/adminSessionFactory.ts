import prisma from '@/prisma/client'

type EngagementBucket = {
  range: string
  count: number
  color: string
}

const EXPECTED_TREASUREMAPS = 1
const EXPECTED_ANCHORS = 1
const EXPECTED_PARLEYS = 1

type TopPerformer = {
  name: string
  subtitle: string
  amount: string
  rank: string
  color: string
}

const colors = ['bg-blue-600', 'bg-violet-600', 'bg-green-600', 'bg-pink-600', 'bg-orange-600']

const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

export const adminSessionFactory = {
  participation: async () => {
    const activeMembers = await prisma.user.findMany({
      where: { membershipStatus: 'ACTIVE' },
      select: {
        id: true,
        giver: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } },
        givenCredits: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } },
        requestedMeetings: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } }
      }
    })

    let totalCompliance = 0

    activeMembers.forEach((member) => {
      const treasureMapCompliance = Math.min(member.giver.length / EXPECTED_TREASUREMAPS, 1)
      const anchorCompliance = Math.min(member.givenCredits.length / EXPECTED_ANCHORS, 1)
      const parleyCompliance = Math.min(member.requestedMeetings.length / EXPECTED_PARLEYS, 1)

      // Average compliance across the three expected actions
      totalCompliance += (treasureMapCompliance + anchorCompliance + parleyCompliance) / 3
    })

    const participationPercent = activeMembers.length ? (totalCompliance / activeMembers.length) * 100 : 0

    return { participationPercent }
  },
  engagement: async () => {
    const users = await prisma.user.findMany({
      where: { membershipStatus: 'ACTIVE' },
      select: {
        id: true,
        giver: { select: { id: true } }, // treasure maps sent
        receiver: { select: { id: true } }, // treasure maps received

        givenCredits: { select: { id: true } }, // anchors given
        receivedCredits: { select: { id: true } }, // anchors received

        requestedMeetings: { select: { id: true } }, // parleys requested
        receivedMeetings: { select: { id: true } } // parleys received
      }
    })

    const engagementPercentages = users.map((user) => {
      const totalActions =
        user.giver.length +
        user.receiver.length + // treasure maps received
        user.givenCredits.length +
        user.receivedCredits.length + // anchors received
        user.requestedMeetings.length +
        user.receivedMeetings.length // parleys received

      const engagement = Math.min((totalActions / 3) * 100, 100) // still capped at 100%
      return engagement
    })

    // Define buckets
    const buckets: EngagementBucket[] = [
      { range: '90-100%', count: 0, color: 'bg-green-500' },
      { range: '70-89%', count: 0, color: 'bg-blue-500' },
      { range: '50-69%', count: 0, color: 'bg-yellow-500' },
      { range: '30-49%', count: 0, color: 'bg-orange-500' },
      { range: '0-29%', count: 0, color: 'bg-red-500' }
    ]

    // Count users per bucket
    engagementPercentages.forEach((percent) => {
      if (percent >= 90) buckets[0].count++
      else if (percent >= 70) buckets[1].count++
      else if (percent >= 50) buckets[2].count++
      else if (percent >= 30) buckets[3].count++
      else buckets[4].count++
    })

    return { buckets }
  },
  topPerformers: async () => {
    const users = await prisma.user.findMany({
      where: { membershipStatus: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        giver: { select: { id: true } }, // TreasureMaps given
        receiver: { select: { id: true } }, // TreasureMaps received
        requestedMeetings: { select: { id: true } }, // Parleys requested
        receivedMeetings: { select: { id: true } }, // Parleys received
        givenCredits: { select: { id: true, businessValue: true } }, // Anchors
        receivedCredits: { select: { id: true, businessValue: true } } // Anchors
      }
    })

    // Fetch all anchors and group by user
    const anchors = await prisma.anchor.findMany({
      select: { id: true, businessValue: true, giverId: true }
    })

    // Map users to total counts
    const userEngagement = users.map((user) => {
      const totalTreasureMaps = (user.giver?.length || 0) + (user.receiver?.length || 0)
      const totalParleys = (user.requestedMeetings?.length || 0) + (user.receivedMeetings?.length || 0)

      const userAnchors = anchors.filter((a) => a.giverId === user.id)
      const totalAnchors = userAnchors.length
      const totalRevenue = userAnchors.reduce((sum, a) => sum + (a.businessValue?.toNumber() || 0), 0)

      return {
        name: user.name,
        subtitle: `${totalAnchors} Anchors • ${totalParleys} Parleys • ${totalTreasureMaps} T-Maps`,
        amount: `$${totalRevenue.toLocaleString()}`,
        engagementScore: totalAnchors + totalParleys + totalTreasureMaps
      }
    })

    // Sort by engagementScore descending
    userEngagement.sort((a, b) => b.engagementScore - a.engagementScore)

    // Take top 5
    const topPerformers: TopPerformer[] = userEngagement.slice(0, 5).map((user, i) => ({
      name: user.name,
      subtitle: user.subtitle,
      amount: user.amount,
      rank: `${i + 1}`,
      color: colors[i] || 'bg-gray-600'
    }))

    return { topPerformers }
  },
  output: async () => {
    // Count of pending user applications
    const newApplicationsCount = await prisma.user.count({
      where: { membershipStatus: 'PENDING' }
    })

    // Count of requested parleys
    const parleyRequestsCount = await prisma.parley.count({
      where: { status: 'REQUESTED' }
    })

    return { newApplicationsCount, parleyRequestsCount }
  }
}
