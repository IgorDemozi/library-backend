-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "systemEntryDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isRented" SET DEFAULT false,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "RentHistory" ALTER COLUMN "withdrawalDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "RentHistory" ADD CONSTRAINT "RentHistory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;