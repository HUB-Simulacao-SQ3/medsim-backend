-- CreateTable
CREATE TABLE "CaseUserHistory" (
    "caseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "history" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseUserHistory_pkey" PRIMARY KEY ("userId","caseId")
);

-- AddForeignKey
ALTER TABLE "CaseUserHistory" ADD CONSTRAINT "CaseUserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseUserHistory" ADD CONSTRAINT "CaseUserHistory_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
