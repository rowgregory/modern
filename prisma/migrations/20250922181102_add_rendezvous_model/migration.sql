-- CreateEnum
CREATE TYPE "RendezvousStatus" AS ENUM ('ACTIVE', 'REMOVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Rendezvous" ADD COLUMN     "status" "RendezvousStatus" NOT NULL DEFAULT 'ACTIVE';
