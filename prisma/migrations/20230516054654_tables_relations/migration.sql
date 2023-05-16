/*
  Warnings:

  - You are about to drop the column `quizId` on the `Case` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[caseId]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `caseId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_quizId_fkey";

-- DropIndex
DROP INDEX "Case_quizId_key";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "quizId";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "caseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_caseId_key" ON "Quiz"("caseId");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
