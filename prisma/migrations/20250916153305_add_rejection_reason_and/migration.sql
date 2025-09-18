-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rejectedAt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "rejectionReason" TEXT NOT NULL DEFAULT '';
