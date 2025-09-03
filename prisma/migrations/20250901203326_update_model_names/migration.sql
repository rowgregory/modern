/*
  Warnings:

  - The values [FACE_TO_FACE_REQUEST,FACE_TO_FACE_CONFIRMED,FACE_TO_FACE_CANCELLED] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ClosedAndCredited` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FaceToFace` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('APPLICATION_SUBMITTED', 'APPLICATION_APPROVED', 'APPLICATION_REJECTED', 'NEW_MEMBER', 'SYSTEM_ALERT', 'PARLEY_REQUEST', 'PARLEY_CONFIRMED', 'PARLEY_CANCELLED');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ClosedAndCredited" DROP CONSTRAINT "ClosedAndCredited_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "ClosedAndCredited" DROP CONSTRAINT "ClosedAndCredited_giverId_fkey";

-- DropForeignKey
ALTER TABLE "ClosedAndCredited" DROP CONSTRAINT "ClosedAndCredited_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FaceToFace" DROP CONSTRAINT "FaceToFace_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "FaceToFace" DROP CONSTRAINT "FaceToFace_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "FaceToFace" DROP CONSTRAINT "FaceToFace_requesterId_fkey";

-- DropTable
DROP TABLE "ClosedAndCredited";

-- DropTable
DROP TABLE "FaceToFace";

-- CreateTable
CREATE TABLE "Parley" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 30,
    "location" TEXT,
    "meetingType" TEXT NOT NULL DEFAULT 'DECK_TO_DECK',
    "requesterId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'REQUESTED',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "referralGiven" BOOLEAN NOT NULL DEFAULT false,
    "referralReceived" BOOLEAN NOT NULL DEFAULT false,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "requesterNotes" TEXT,
    "recipientNotes" TEXT,
    "chapterId" TEXT,

    CONSTRAINT "Parley_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anchored" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "giverId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "businessValue" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "description" TEXT NOT NULL,
    "clientName" TEXT,
    "closedDate" TIMESTAMP(3) NOT NULL,
    "chapterId" TEXT NOT NULL,
    "announcedAt" TIMESTAMP(3),
    "meetingId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'REPORTED',
    "notes" TEXT,

    CONSTRAINT "Anchored_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Parley_chapterId_idx" ON "Parley"("chapterId");

-- CreateIndex
CREATE INDEX "Parley_scheduledAt_idx" ON "Parley"("scheduledAt");

-- CreateIndex
CREATE INDEX "Parley_status_idx" ON "Parley"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Parley_requesterId_recipientId_scheduledAt_key" ON "Parley"("requesterId", "recipientId", "scheduledAt");

-- CreateIndex
CREATE INDEX "Anchored_chapterId_idx" ON "Anchored"("chapterId");

-- CreateIndex
CREATE INDEX "Anchored_giverId_idx" ON "Anchored"("giverId");

-- CreateIndex
CREATE INDEX "Anchored_receiverId_idx" ON "Anchored"("receiverId");

-- CreateIndex
CREATE INDEX "Anchored_closedDate_idx" ON "Anchored"("closedDate");

-- CreateIndex
CREATE INDEX "Anchored_announcedAt_idx" ON "Anchored"("announcedAt");

-- AddForeignKey
ALTER TABLE "Parley" ADD CONSTRAINT "Parley_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parley" ADD CONSTRAINT "Parley_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parley" ADD CONSTRAINT "Parley_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchored" ADD CONSTRAINT "Anchored_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchored" ADD CONSTRAINT "Anchored_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchored" ADD CONSTRAINT "Anchored_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
