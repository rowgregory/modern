/*
  Warnings:

  - You are about to drop the column `isFinalDecisionMde` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isFinalDecisionMde",
ADD COLUMN     "isFinalDecisionMade" BOOLEAN NOT NULL DEFAULT false;
