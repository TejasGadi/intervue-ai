import { prisma } from "../prisma";
import  { FeedbackDto} from "../dtos/FeedbackDto";

export class InterviewService {
    static async saveFeedback(data : FeedbackDto){
        return prisma.interviewFeedback.create({data})
    }
}