-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "video_reaction" (
    "id" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "video_reaction_userId_idx" ON "video_reaction"("userId");

-- CreateIndex
CREATE INDEX "video_reaction_videoId_idx" ON "video_reaction"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "video_reaction_videoId_userId_key" ON "video_reaction"("videoId", "userId");

-- AddForeignKey
ALTER TABLE "video_reaction" ADD CONSTRAINT "video_reaction_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_reaction" ADD CONSTRAINT "video_reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
