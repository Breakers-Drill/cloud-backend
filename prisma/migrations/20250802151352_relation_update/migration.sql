-- DropForeignKey
ALTER TABLE "sensor_data" DROP CONSTRAINT "sensor_data_tagsDataId_fkey";

-- AlterTable
ALTER TABLE "sensor_data" ALTER COLUMN "tagsDataId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_tagsDataId_fkey" FOREIGN KEY ("tagsDataId") REFERENCES "tags_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
