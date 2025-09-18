import prisma from '@/prisma/client'
import { startOfLastMonth, startOfNextMonth, startOfThisMonth, startOfThisMonthCopy } from '../../date/formatDate'

export const memberStatCardFactory = {
  card: {
    revenue: async (id: string) => {
      // === Calculate total revenue from Anchor.businessValue for this user ===
      const totalRevenueResult = await prisma.anchor.aggregate({
        _sum: {
          businessValue: true
        },
        where: {
          giverId: id
        }
      })

      const totalRevenue = totalRevenueResult._sum.businessValue || 0

      // === Calculate total revenue change month over month for this user ===

      // 1. Revenue this month
      const thisMonthRevenue = await prisma.anchor.aggregate({
        _sum: { businessValue: true },
        where: {
          giverId: id, // Changed from id to giverId
          createdAt: {
            gte: startOfThisMonth,
            lt: startOfNextMonth
          }
        }
      })

      // 2. Revenue last month
      const lastMonthRevenue = await prisma.anchor.aggregate({
        _sum: { businessValue: true },
        where: {
          giverId: id, // Changed from id to giverId
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfThisMonthCopy
          }
        }
      })

      const currentRevenue: any = thisMonthRevenue._sum.businessValue || 0
      const previousRevenue: any = lastMonthRevenue._sum.businessValue || 0

      const revenueChange = currentRevenue - previousRevenue
      const totalRevenueChange = previousRevenue ? (revenueChange / previousRevenue) * 100 : 100

      return { totalRevenue, totalRevenueChange }
    },
    parley: async (id: string) => {
      // === Total Parley's ===
      const totalParleys = await prisma.parley.count({
        where: {
          requesterId: id
        }
      })

      //  === Calculate total parleys month-over-month
      const getParleysCountForMonth = async (start: Date, end: Date) => {
        const parleys = await prisma.parley.count({
          where: {
            requesterId: id,
            createdAt: { gte: start, lt: end }
          }
        })

        return parleys
      }

      const thisMonthParleys = await getParleysCountForMonth(startOfThisMonth, startOfNextMonth)
      const lastMonthParleys = await getParleysCountForMonth(startOfLastMonth, startOfThisMonthCopy)

      const parleysChange = thisMonthParleys - lastMonthParleys
      const parleysChangePercent = lastMonthParleys ? (parleysChange / lastMonthParleys) * 100 : 100

      return { totalParleys, parleysChangePercent }
    },
    anchor: async (id: string) => {
      // === Total Anchor's ===
      const totalAnchors = await prisma.anchor.count({
        where: {
          giverId: id
        }
      })

      //  === Calculate total anchors month-over-month
      const getAnchorsCountForMonth = async (start: Date, end: Date) => {
        const anchors = await prisma.anchor.count({
          where: {
            giverId: id,
            createdAt: { gte: start, lt: end }
          }
        })

        return anchors
      }

      const thisMonthAnchors = await getAnchorsCountForMonth(startOfThisMonth, startOfNextMonth)
      const lastMonthAnchors = await getAnchorsCountForMonth(startOfLastMonth, startOfThisMonthCopy)

      const anchorsChange = thisMonthAnchors - lastMonthAnchors
      const anchorsChangePercent = lastMonthAnchors ? (anchorsChange / lastMonthAnchors) * 100 : 100

      return { totalAnchors, anchorsChangePercent }
    },
    treasureMap: async (id: string) => {
      // === Total Treasure Maps ===
      const totalTreasureMaps = await prisma.treasureMap.count({
        where: {
          giverId: id
        }
      })

      //  === Calculate total treasure maps month-over-month
      const getTreasureMapsCountForMonth = async (start: Date, end: Date) => {
        const treasureMaps = await prisma.treasureMap.count({
          where: {
            giverId: id,
            createdAt: { gte: start, lt: end }
          }
        })

        return treasureMaps
      }

      const thisMonthTreasureMaps = await getTreasureMapsCountForMonth(startOfThisMonth, startOfNextMonth)
      const lastMonthTreasureMaps = await getTreasureMapsCountForMonth(startOfLastMonth, startOfThisMonthCopy)

      const treasureMapsChange = thisMonthTreasureMaps - lastMonthTreasureMaps
      const treasureMapsChangePercent = lastMonthTreasureMaps ? (treasureMapsChange / lastMonthTreasureMaps) * 100 : 100

      return { totalTreasureMaps, treasureMapsChangePercent }
    }
  }
}
