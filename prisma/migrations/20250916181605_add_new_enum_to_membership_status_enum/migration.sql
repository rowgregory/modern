-- AlterEnum
ALTER TYPE "membership_status" ADD VALUE 'FINAL_DECISION';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rejectedStep" TEXT DEFAULT '';
