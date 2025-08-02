/*
  Warnings:

  - Added the required column `tagsDataId` to the `sensor_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sensor_data" ADD COLUMN     "tagsDataId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_tagsDataId_fkey" FOREIGN KEY ("tagsDataId") REFERENCES "tags_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
