/*
  Warnings:

  - You are about to drop the `Anchored` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anchored" DROP CONSTRAINT "Anchored_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Anchored" DROP CONSTRAINT "Anchored_giverId_fkey";

-- DropForeignKey
ALTER TABLE "Anchored" DROP CONSTRAINT "Anchored_receiverId_fkey";

-- DropTable
DROP TABLE "Anchored";

-- CreateTable
CREATE TABLE "Anchor" (
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

    CONSTRAINT "Anchor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Anchor_chapterId_idx" ON "Anchor"("chapterId");

-- CreateIndex
CREATE INDEX "Anchor_giverId_idx" ON "Anchor"("giverId");

-- CreateIndex
CREATE INDEX "Anchor_receiverId_idx" ON "Anchor"("receiverId");

-- CreateIndex
CREATE INDEX "Anchor_closedDate_idx" ON "Anchor"("closedDate");

-- CreateIndex
CREATE INDEX "Anchor_announcedAt_idx" ON "Anchor"("announcedAt");

-- AddForeignKey
ALTER TABLE "Anchor" ADD CONSTRAINT "Anchor_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchor" ADD CONSTRAINT "Anchor_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchor" ADD CONSTRAINT "Anchor_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
