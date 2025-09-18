/*
  Warnings:

  - You are about to drop the column `hasUnlockedAttendance` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "hasUnlockedAttendance",
ADD COLUMN     "hasUnlockedMuster" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TreasureMap" ADD COLUMN     "isThirdParty" BOOLEAN NOT NULL DEFAULT false;
