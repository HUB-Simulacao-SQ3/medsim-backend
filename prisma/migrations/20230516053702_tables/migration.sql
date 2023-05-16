/*
  Warnings:

  - A unique constraint covering the columns `[quizId]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - Made the column `quizId` on table `Case` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_quizId_fkey";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "quizId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "edges" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Case_quizId_key" ON "Case"("quizId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
