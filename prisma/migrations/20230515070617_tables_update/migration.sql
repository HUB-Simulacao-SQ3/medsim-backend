-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_quizId_fkey";

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "quizId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
