-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "businessLicenseNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isLicensed" BOOLEAN NOT NULL DEFAULT false;
