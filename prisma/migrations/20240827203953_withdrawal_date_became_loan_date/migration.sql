/*
  Warnings:

  - You are about to drop the column `withdrawalDate` on the `RentHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RentHistory" DROP COLUMN "withdrawalDate",
ADD COLUMN     "loanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
