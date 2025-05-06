import {FEEDBACK_PROMPT} from "@/services/Constants"
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { InterviewService } from "@/lib/services/InterviewService";
import { FeedbackDto } from "@/lib/dtos/FeedbackDto";

export async function POST(req : Request) {

    if (req.method !== "POST") {
        return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
    }

    const {conversation, userName, userEmail, interview_id, recommended = false} = await req.json()
    
    const conversationStr = typeof conversation === 'string'
    ? conversation
    : JSON.stringify(conversation);

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', conversationStr)
    const openai = new OpenAI({
        // baseURL: "https://openrouter.ai/api/v1",
        // apiKey: process.env.OPENROUTER_API_KEY,
        apiKey: process.env.OPENAI_API_KEY,
      });
    
    let completion;
    try {
    completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    } catch (e) {
    console.error("OpenAI error:", e);
    return NextResponse.json({ error: "AI completion failed" }, { status: 502 });
    }

    console.log(completion)

    // Extract & pasrse JSON..
    const raw = completion.choices?.[0]?.message?.content || '';
    const cleaned = raw.replace(/^["']*```json\s*/, '')
                    .replace(/\s*```["']*$/, '')
                    .replace(/\\n/g, '\n')
    console.log("Cleaned JSON:", cleaned);    
    
    let feedbackJson: any;
    try {
        feedbackJson = JSON.parse(cleaned);
        console.log("Parsed JSON:", feedbackJson);
    } catch (error) {
        console.error("Parse error", error)
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 502 });    
    }

    // Persist via Prisma 
    let saved;
    const dto: FeedbackDto = {
        userName,
        userEmail,
        interview_id,
        feedback: feedbackJson as object,
        recommended,
    }
    try {
        saved = await InterviewService.saveFeedback(dto)
    } catch (e){
        console.error("Prisma save error", e)
        return NextResponse.json({ error: "Failed to save feedback" }, { status: 502 });
    }
    
    return NextResponse.json({ content: feedbackJson, saved }, { status: 200 });
}