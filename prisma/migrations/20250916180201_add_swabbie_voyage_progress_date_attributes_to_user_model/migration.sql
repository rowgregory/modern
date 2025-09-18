-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroundCheckCompletedAt" TEXT DEFAULT '',
ADD COLUMN     "finalDecisionAt" TEXT DEFAULT '',
ADD COLUMN     "initialReviewCompletedAt" TEXT DEFAULT '';
