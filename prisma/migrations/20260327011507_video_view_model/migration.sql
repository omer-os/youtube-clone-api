/*
  Warnings:

  - You are about to drop the column `views` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "video" DROP COLUMN "views";

-- CreateTable
CREATE TABLE "video_view" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_view_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "video_view_userId_idx" ON "video_view"("userId");

-- CreateIndex
CREATE INDEX "video_view_videoId_idx" ON "video_view"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "video_view_videoId_userId_key" ON "video_view"("videoId", "userId");

-- AddForeignKey
ALTER TABLE "video_view" ADD CONSTRAINT "video_view_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_view" ADD CONSTRAINT "video_view_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
