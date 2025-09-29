/*
  Warnings:

  - You are about to drop the column `addedBy` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addedBy_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addedBy";
