-- CreateTable
CREATE TABLE "interviewFeedback" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "feedback" JSONB NOT NULL,
    "recommended" BOOLEAN NOT NULL,

    CONSTRAINT "interviewFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interviewFeedback_interview_id_key" ON "interviewFeedback"("interview_id");
