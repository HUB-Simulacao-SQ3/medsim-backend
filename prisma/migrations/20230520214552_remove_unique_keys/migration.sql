/*
  Warnings:

  - The primary key for the `CaseUserHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `CaseUserHistory` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CaseUserHistory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CaseUserHistory" DROP CONSTRAINT "CaseUserHistory_pkey",
ADD COLUMN     "id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CaseUserHistory_id_key" ON "CaseUserHistory"("id");
