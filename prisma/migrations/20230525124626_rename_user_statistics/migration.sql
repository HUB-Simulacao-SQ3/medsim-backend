/*
  Warnings:

  - You are about to drop the column `concluidAt` on the `UserStatistics` table. All the data in the column will be lost.
  - Added the required column `completedAt` to the `UserStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStatistics" DROP COLUMN "concluidAt",
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL;
