import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  const { jobPosition, jobDescription, interviewDuration, type } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", interviewDuration)
    .replace("{{type}}", Array.isArray(type) ? type.join(", ") : String(type));

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5-8b-exp",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
  } catch (e) {
    console.error("OpenAI error:", e);
    return NextResponse.json({ error: "AI completion failed" }, { status: 502 });
  }

  console.log(completion)

  const content = completion.choices?.[0]?.message?.content;
  if (!content) {
    return NextResponse.json(
      { error: "Empty response received from OpenAI" },
      { status: 502 }
    );
  }

  return NextResponse.json({ content });
}