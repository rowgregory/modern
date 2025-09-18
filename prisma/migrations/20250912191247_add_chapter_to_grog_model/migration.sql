/*
  Warnings:

  - Added the required column `chapterId` to the `Grog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grog" ADD COLUMN     "chapterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Grog" ADD CONSTRAINT "Grog_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
