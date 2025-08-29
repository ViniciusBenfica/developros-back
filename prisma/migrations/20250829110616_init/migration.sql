-- CreateTable
CREATE TABLE "public"."ShortUrl" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "target" TEXT NOT NULL,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id")
);
