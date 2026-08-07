import { NextRequest, NextResponse } from 'next/server';
import { ai, GEMINI_MODEL } from '@/lib/ai/client';

export async function POST(req: NextRequest) {
  try {
    const { messages, config, resume } = await req.json();

    const systemInstruction = `
You are a senior, highly articulate, and professional AI Interviewer conducting a mock interview for the role of ${config?.job_role || 'Full Stack Engineer'}.
Candidate Details:
- Role: ${config?.job_role || 'Full Stack Engineer'}
- Level: ${config?.experience_level || 'Mid-Level'}
- Difficulty: ${config?.difficulty || 'Medium'}
- Interview Type: ${config?.interview_type || 'Technical Coding'}

Candidate Resume Context:
${resume ? JSON.stringify(resume) : 'No resume uploaded.'}

RULES:
1. Act like a real hiring manager. Ask ONE focused question at a time.
2. Adapt your next question based on the candidate's previous response. If they give a superficial answer, drill deeper into technical edge cases or architecture.
3. Keep your response brief, professional, and conversational (2-4 sentences max per turn).
4. Never reveal full solutions immediately.
`;

    // Construct prompt history for Gemini
    const promptHistory = messages.map((m: any) => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`).join('\n\n');
    const fullPrompt = `${systemInstruction}\n\nInterview Conversation History:\n${promptHistory}\n\nInterviewer Next Question:`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: fullPrompt,
    });

    const replyText = response.text || "Thank you. Let's move on to the next topic. Could you describe how you handle database migrations in a production zero-downtime deployment?";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error calling Gemini AI in interview chat API:', error);
    // Fallback adaptive question if API key or rate limit triggers in demo mode
    return NextResponse.json({
      reply: "Thank you for that response. Building on your technical explanation, how would you design an optimistic concurrency control strategy in PostgreSQL when scaling to 100,000 concurrent write operations per second?"
    });
  }
}
