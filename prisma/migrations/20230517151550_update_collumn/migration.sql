/*
  Warnings:

  - You are about to drop the column `wight` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `weight` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "wight",
ADD COLUMN     "weight" TEXT NOT NULL;
