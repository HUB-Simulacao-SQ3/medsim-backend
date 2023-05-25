/*
  Warnings:

  - The `completedCount` column on the `UserStatistics` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserStatistics" DROP COLUMN "completedCount",
ADD COLUMN     "completedCount" INTEGER DEFAULT 0;
