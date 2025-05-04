export interface FeedbackDto {
    userName: string
    userEmail: string
    interview_id: string
    feedback: Record<string, any>
    recommended: boolean
}