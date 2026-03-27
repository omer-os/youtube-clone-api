/*
  Warnings:

  - Added the required column `title` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- AlterTable
ALTER TABLE "video" ADD COLUMN     "description" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';
