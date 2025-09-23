-- DropForeignKey
ALTER TABLE "Anchor" DROP CONSTRAINT "Anchor_giverId_fkey";

-- DropForeignKey
ALTER TABLE "Anchor" DROP CONSTRAINT "Anchor_receiverId_fkey";

-- AlterTable
ALTER TABLE "Anchor" ALTER COLUMN "giverId" DROP NOT NULL,
ALTER COLUMN "receiverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Anchor" ADD CONSTRAINT "Anchor_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anchor" ADD CONSTRAINT "Anchor_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
