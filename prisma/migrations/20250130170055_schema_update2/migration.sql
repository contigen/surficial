/*
  Warnings:

  - Added the required column `walletId` to the `NFTCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFTCollection" ADD COLUMN     "walletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "NFTCollection" ADD CONSTRAINT "NFTCollection_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
