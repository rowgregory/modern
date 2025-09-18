-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBackgroudCheckCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFinalDecisionMde" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isInitialReviewCompleted" BOOLEAN NOT NULL DEFAULT false;
