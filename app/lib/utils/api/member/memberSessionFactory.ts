import prisma from '@/prisma/client'

const EXPECTED_TREASUREMAPS = 1
const EXPECTED_ANCHORS = 1
const EXPECTED_PARLEYS = 1

const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

export const memberSessionFactory = {
  participation: async (id: string) => {
    const activeMember = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        giver: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } },
        givenCredits: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } },
        requestedMeetings: { where: { createdAt: { gte: sevenDaysAgo } }, select: { id: true } }
      }
    })

    if (!activeMember) {
      return { participationPercent: 0 } // Return 0 instead of null
    }

    const treasureMapCompliance = Math.min(activeMember.giver.length / EXPECTED_TREASUREMAPS, 1)
    const anchorCompliance = Math.min(activeMember.givenCredits.length / EXPECTED_ANCHORS, 1)
    const parleyCompliance = Math.min(activeMember.requestedMeetings.length / EXPECTED_PARLEYS, 1)

    // Average compliance across the three expected actions
    const totalCompliance = (treasureMapCompliance + anchorCompliance + parleyCompliance) / 3

    // Convert to percentage
    const participationPercent = totalCompliance * 100

    return { participationPercent }
  },
  engagement: async (id: string) => {
    const user = await prisma.user.findFirst({
      where: { id },
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

    if (!user) {
      return { engagementPercent: 0 }
    }

    const totalActions =
      user.giver.length +
      user.receiver.length + // treasure maps received
      user.givenCredits.length +
      user.receivedCredits.length + // anchors received
      user.requestedMeetings.length +
      user.receivedMeetings.length // parleys received

    const engagementPercent = Math.min((totalActions / 3) * 100, 100) // still capped at 100%

    return { engagementPercent }
  },
  output: async (id: string) => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
    const totalRequestedParleyCountThisMonth = await prisma.parley.count({
      where: {
        requesterId: id,
        createdAt: { gte: oneMonthAgo }
      }
    })
    const totalGivenTreasureMapCountThisMonth = await prisma.treasureMap.count({
      where: {
        giverId: id,
        createdAt: { gte: oneMonthAgo }
      }
    })

    const parleys = await prisma.parley.findMany({
      where: {
        requesterId: id,
        status: {
          in: ['REQUESTED', 'CONFIRMED']
        }
      },
      include: {
        chapter: {
          select: {
            id: true,
            name: true
          }
        },
        requester: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        },
        recipient: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            profileImage: true
          }
        }
      }
    })

    const totalClosedAnchorCountThisMonth = await prisma.anchor.count({
      where: {
        giverId: id,
        status: 'CLOSED' // if you have status field
      }
    })

    return {
      parleys,
      totalRequestedParleyCountThisMonth,
      totalGivenTreasureMapCountThisMonth,
      totalClosedAnchorCountThisMonth
    }
  }
}
