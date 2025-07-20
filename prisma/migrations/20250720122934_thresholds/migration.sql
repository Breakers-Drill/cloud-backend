-- CreateTable
CREATE TABLE "thresholds" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "min" INTEGER,
    "max" INTEGER,

    CONSTRAINT "thresholds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "thresholds_tag_key" ON "thresholds"("tag");
