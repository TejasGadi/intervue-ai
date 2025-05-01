-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "interviewDuration" TEXT NOT NULL,
    "type" TEXT[],
    "question_list" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interview_interview_id_key" ON "Interview"("interview_id");
