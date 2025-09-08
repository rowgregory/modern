-- CreateTable
CREATE TABLE "TreasureMap" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "giverId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT,
    "clientPhone" TEXT,
    "serviceNeeded" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'GIVEN',
    "contactedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "notes" TEXT,
    "giverNotes" TEXT,
    "receiverNotes" TEXT,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "TreasureMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TreasureMap_chapterId_idx" ON "TreasureMap"("chapterId");

-- CreateIndex
CREATE INDEX "TreasureMap_giverId_idx" ON "TreasureMap"("giverId");

-- CreateIndex
CREATE INDEX "TreasureMap_receiverId_idx" ON "TreasureMap"("receiverId");

-- CreateIndex
CREATE INDEX "TreasureMap_status_idx" ON "TreasureMap"("status");

-- CreateIndex
CREATE INDEX "TreasureMap_createdAt_idx" ON "TreasureMap"("createdAt");

-- AddForeignKey
ALTER TABLE "TreasureMap" ADD CONSTRAINT "TreasureMap_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreasureMap" ADD CONSTRAINT "TreasureMap_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreasureMap" ADD CONSTRAINT "TreasureMap_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
