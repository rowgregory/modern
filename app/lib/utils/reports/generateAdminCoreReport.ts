interface PDFOptions {
  title?: string
  subtitle?: string
  includeCharts?: boolean
  includeDetailedBreakdown?: boolean
  colorScheme?: 'default' | 'professional' | 'nautical'
}

interface MemberData {
  id: string
  name: string
  industry: string
  joinedAt: string
  membershipStatus: string
  overallHealth: string
  scores: {
    networkingScore: number
    engagementScore: number
    revenue: number
    businessGiven: number
    businessReceived: number
  }
  metrics: {
    treasureMaps: { given: number; received: number; target: number }
    anchors: { given: number; received: number; target: number }
    parleys: { requested: number; received: number; target: number }
    attendance: { present: number; total: number }
  }
  totalActivities: number
}

export const generateAdminCoreReport = async (memberData: MemberData[], options: PDFOptions = {}) => {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF('portrait', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  const colors: {
    primary: [number, number, number]
    secondary: [number, number, number]
    success: [number, number, number]
    warning: [number, number, number]
    danger: [number, number, number]
    text: [number, number, number]
    background: [number, number, number]
  } = {
    primary: [30, 64, 175],
    secondary: [107, 114, 128],
    success: [34, 197, 94],
    warning: [234, 179, 8],
    danger: [239, 68, 68],
    text: [17, 24, 39],
    background: [249, 250, 251]
  }

  // Helper functions
  const addPageIfNeeded = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage()
      yPosition = 20
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getHealthColor = (health: string): [number, number, number] => {
    switch (health) {
      case 'excellent':
        return colors.success
      case 'good':
        return colors.primary
      case 'warning':
        return colors.warning
      case 'critical':
        return colors.danger
      default:
        return colors.secondary
    }
  }

  // Header
  doc.setFillColor(...colors.primary)
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(options.title || 'CORE Chapter Performance Report', 20, 25)

  if (options.subtitle) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.text(options.subtitle, 20, 32)
  }

  doc.setTextColor(...colors.text)
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 60, 15)

  yPosition = 50

  // Executive Summary
  addPageIfNeeded(30)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Executive Summary', 20, yPosition)
  yPosition += 10

  // Calculate summary stats
  const totalMembers = memberData.length
  const activeMembers = memberData.filter((m) => m.membershipStatus === 'ACTIVE').length
  const avgNetworkingScore = memberData.reduce((sum, m) => sum + m.scores.networkingScore, 0) / totalMembers
  const avgEngagementScore = memberData.reduce((sum, m) => sum + m.scores.engagementScore, 0) / totalMembers
  const totalRevenue = memberData.reduce((sum, m) => sum + m.scores.revenue, 0)
  const healthDistribution = memberData.reduce(
    (acc, m) => {
      acc[m.overallHealth] = (acc[m.overallHealth] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Summary stats in a properly sized box
  doc.setFillColor(...colors.background)
  doc.rect(20, yPosition, pageWidth - 40, 50, 'F') // Increased height from 35 to 50
  doc.setDrawColor(...colors.secondary)
  doc.rect(20, yPosition, pageWidth - 40, 50, 'S')

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  // Left column
  const leftColumnItems = [
    `Total Members: ${totalMembers}`,
    `Active Members: ${activeMembers}`,
    `Total Revenue: ${formatCurrency(totalRevenue)}`
  ]

  // Right column
  const rightColumnItems = [
    `Avg Networking Score: ${avgNetworkingScore.toFixed(1)}%`,
    `Avg Engagement Score: ${avgEngagementScore.toFixed(1)}%`
  ]

  // Render left column
  leftColumnItems.forEach((item, index) => {
    doc.text(item, 25, yPosition + 8 + index * 6)
  })

  // Render right column
  rightColumnItems.forEach((item, index) => {
    doc.text(item, pageWidth / 2 + 5, yPosition + 8 + index * 6)
  })

  // Health distribution on its own line at the bottom
  doc.text('Health Distribution:', 25, yPosition + 32)
  doc.text(
    `Excellent (${healthDistribution.excellent || 0}), Good (${healthDistribution.good || 0}), Warning (${healthDistribution.warning || 0}), Critical (${healthDistribution.critical || 0})`,
    25,
    yPosition + 38
  )

  yPosition += 60 // Increased spacing

  // Member Performance Table
  addPageIfNeeded(20)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Member Performance Overview', 20, yPosition)
  yPosition += 15

  // Table headers
  doc.setFillColor(...colors.primary)
  doc.rect(20, yPosition - 5, pageWidth - 40, 8, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  const headers = ['Name', 'Industry', 'Health', 'Network %', 'Engage %', 'Revenue']
  const colWidths = [40, 35, 20, 20, 20, 25]
  let xPos = 25

  headers.forEach((header, index) => {
    doc.text(header, xPos, yPosition)
    xPos += colWidths[index]
  })

  yPosition += 5
  doc.setTextColor(...colors.text)

  // Member rows
  memberData.forEach((member, index) => {
    addPageIfNeeded(8)

    // Alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245)
      doc.rect(20, yPosition - 3, pageWidth - 40, 6, 'F')
    }

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')

    xPos = 25
    const rowData = [
      member.name.length > 18 ? member.name.substring(0, 15) + '...' : member.name,
      member.industry.length > 15 ? member.industry.substring(0, 12) + '...' : member.industry,
      member.overallHealth.charAt(0).toUpperCase() + member.overallHealth.slice(1),
      `${Number(member.scores.networkingScore).toFixed(1)}%`,
      `${member.scores.engagementScore}%`,
      formatCurrency(member.scores.revenue)
    ]

    rowData.forEach((data, colIndex) => {
      if (colIndex === 2) {
        // Health column - color coded
        const healthColor = getHealthColor(member.overallHealth)
        doc.setTextColor(...healthColor)
        doc.text(data, xPos, yPosition)
        doc.setTextColor(...colors.text)
      } else {
        doc.text(data, xPos, yPosition)
      }
      xPos += colWidths[colIndex]
    })

    yPosition += 6
  })

  yPosition += 10

  // Detailed Breakdown Section
  if (options.includeDetailedBreakdown !== false) {
    addPageIfNeeded(40)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Activity Breakdown', 20, yPosition)
    yPosition += 15

    // Activity summary
    const activityStats = memberData.reduce(
      (acc, member) => {
        acc.totalTreasureMaps += member.metrics.treasureMaps.given + member.metrics.treasureMaps.received
        acc.totalAnchors += member.metrics.anchors.given + member.metrics.anchors.received
        acc.totalParleys += member.metrics.parleys.requested + member.metrics.parleys.received
        acc.totalAttendance += member.metrics.attendance.present
        acc.totalMeetings += member.metrics.attendance.total
        return acc
      },
      {
        totalTreasureMaps: 0,
        totalAnchors: 0,
        totalParleys: 0,
        totalAttendance: 0,
        totalMeetings: 0
      }
    )

    const attendanceRate =
      activityStats.totalMeetings > 0
        ? ((activityStats.totalAttendance / activityStats.totalMeetings) * 100).toFixed(1)
        : '0'

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Chapter Activity Summary', 20, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const activityItems = [
      `Total Treasure Maps (Referrals): ${activityStats.totalTreasureMaps}`,
      `Total Anchors (Thank You for Business): ${activityStats.totalAnchors}`,
      `Total Parleys (Meeting Requests): ${activityStats.totalParleys}`,
      `Overall Attendance Rate: ${attendanceRate}%`
    ]

    activityItems.forEach((item) => {
      doc.text(`• ${item}`, 25, yPosition)
      yPosition += 5
    })

    yPosition += 10
  }

  // Performance Insights
  addPageIfNeeded(30)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Performance Insights', 20, yPosition)
  yPosition += 15

  // Top performers
  const topPerformers = [...memberData]
    .sort(
      (a, b) =>
        b.scores.networkingScore + b.scores.engagementScore - (a.scores.networkingScore + a.scores.engagementScore)
    )
    .slice(0, 5)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Top Performers (Combined Network + Engagement Score)', 20, yPosition)
  yPosition += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  topPerformers.forEach((member, index) => {
    const combinedScore = member.scores.networkingScore + member.scores.engagementScore
    doc.text(`${index + 1}. ${member.name} - ${Number(combinedScore)?.toFixed(1)}% (${member.industry})`, 25, yPosition)
    yPosition += 5
  })

  yPosition += 10

  // Members needing attention
  const needsAttention = memberData.filter((m) => m.overallHealth === 'critical' || m.overallHealth === 'warning')

  if (needsAttention.length > 0) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Members Requiring Attention', 20, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    needsAttention.forEach((member) => {
      const healthColor = getHealthColor(member.overallHealth)
      doc.setTextColor(...healthColor)
      doc.text(`• ${member.name} (${member.overallHealth.toUpperCase()}) - `, 25, yPosition)
      doc.setTextColor(...colors.text)
      doc.text(
        `Network: ${Number(member.scores.networkingScore)?.toFixed(1)}%, Engagement: ${member.scores.engagementScore}%`,
        80,
        yPosition
      )
      yPosition += 5
    })
  }

  // Footer on last page
  const totalPages = doc.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...colors.secondary)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10)
    doc.text('CORE Chapter Management System', 20, pageHeight - 10)
  }

  // Save the PDF
  const fileName = `CORE_Chapter_Report_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)

  return {
    success: true,
    fileName,
    memberCount: totalMembers,
    reportDate: new Date().toISOString()
  }
}
