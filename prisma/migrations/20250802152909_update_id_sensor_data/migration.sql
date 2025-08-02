/*
  Warnings:

  - The primary key for the `sensor_data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "sensor_data" DROP CONSTRAINT "sensor_data_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "sensor_data_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "sensor_data_id_seq";
