/*
  Warnings:

  - You are about to drop the column `returnDate` on the `RentHistory` table. All the data in the column will be lost.
  - Added the required column `returnDate` to the `RentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RentHistory" DROP COLUMN "deliveryDate",
ADD COLUMN     "returnDate" TIMESTAMP(3) NOT NULL;
