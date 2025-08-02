-- CreateTable
CREATE TABLE "tags_data" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "min_value" INTEGER NOT NULL,
    "max_value" INTEGER NOT NULL,

    CONSTRAINT "tags_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_data_tag_key" ON "tags_data"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "tags_data_name_key" ON "tags_data"("name");
