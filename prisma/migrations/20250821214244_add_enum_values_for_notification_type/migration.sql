-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'FACE_TO_FACE_REQUEST';
ALTER TYPE "NotificationType" ADD VALUE 'FACE_TO_FACE_CONFIRMED';
ALTER TYPE "NotificationType" ADD VALUE 'FACE_TO_FACE_CANCELLED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "industry" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "website" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearsInBusiness" TEXT NOT NULL DEFAULT '';
