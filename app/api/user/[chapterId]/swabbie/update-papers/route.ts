import { sliceUser } from '@/app/lib/constants/api/sliceNames'
import { handleApiError } from '@/app/lib/utils/api/handleApiError'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: any) {
  const parameters = await params
  const chapterId = parameters.chapterId

  if (!chapterId) {
    return NextResponse.json({ message: 'Chapter Id missing' }, { status: 404 })
  }

  try {
    const body = await req.json()
    const { swabbieId, name, email, location, phone, company, industry, isLicensed, businessLicenseNumber } = body

    const swabbie = await prisma.user.findFirst({ where: { id: swabbieId } })

    if (!swabbie) {
      return NextResponse.json({ message: 'Swabbie not found. Try again.' }, { status: 404 })
    }

    const updateData: Record<string, string | boolean | number> = {}

    if (name !== undefined && name !== null) updateData.name = name
    if (email !== undefined && email !== null) updateData.email = email
    if (location !== undefined && location !== null) updateData.location = location
    if (phone !== undefined && phone !== null) updateData.phone = phone
    if (company !== undefined && company !== null) updateData.company = company
    if (industry !== undefined && industry !== null) updateData.industry = industry
    if (isLicensed !== undefined && isLicensed !== null) updateData.isLicensed = isLicensed
    if (businessLicenseNumber !== undefined && businessLicenseNumber !== null)
      updateData.businessLicenseNumber = businessLicenseNumber

    // Only update if there are fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: 'No valid fields to update' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: swabbieId },
      data: updateData
    })

    return NextResponse.json(
      {
        message: 'Swabbie papers updated successfully',
        success: true
      },
      { status: 200 }
    )
  } catch (error) {
    return await handleApiError({
      error,
      req,
      action: 'Swabbie updating papers',
      sliceName: sliceUser
    })
  }
}
