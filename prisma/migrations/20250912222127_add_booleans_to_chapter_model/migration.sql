-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "hasUnlockedAttendance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasUnlockedBooty" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasUnlockedGrog" BOOLEAN NOT NULL DEFAULT false;
