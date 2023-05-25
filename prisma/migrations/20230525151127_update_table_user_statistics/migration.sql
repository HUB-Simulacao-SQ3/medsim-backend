/*
  Warnings:

  - You are about to drop the column `completed` on the `UserStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `UserStatistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserStatistics" DROP COLUMN "completed",
DROP COLUMN "completedAt",
ADD COLUMN     "completedCount" BOOLEAN DEFAULT false;
