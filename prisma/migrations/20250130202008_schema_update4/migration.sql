/*
  Warnings:

  - Added the required column `userId` to the `NFTAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NFT_tokenId_key";

-- DropIndex
DROP INDEX "NFTCollection_name_key";

-- AlterTable
ALTER TABLE "NFTAnalysis" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "NFTAnalysis" ADD CONSTRAINT "NFTAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
