-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_cityId_fkey";

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
