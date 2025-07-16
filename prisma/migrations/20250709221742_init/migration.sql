-- CreateTable
CREATE TABLE "sensor_data" (
    "id" SERIAL NOT NULL,
    "edge_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "sensor_data_pkey" PRIMARY KEY ("id")
);
