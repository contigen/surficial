/*
  Warnings:

  - Added the required column `walletId` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "walletId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
