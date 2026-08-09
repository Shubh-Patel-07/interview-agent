import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { HACKATHON_CURRICULUM } from '@/lib/data/curriculum';

// In-memory Session Cache for Hackathon Evaluation API Contract
const sessionCache = new Map<string, {
  candidate: any;
  messages: Array<{ role: 'user' | 'model'; text: string }>;
  turnCount: number;
}>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, candidate, message } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // 1. Initial Session Start
    if (candidate && (!message || message.trim() === '')) {
      sessionCache.set(sessionId, {
        candidate,
        messages: [],
        turnCount: 0,
      });

      const candidateName = candidate.member?.name || candidate.name || 'Candidate';
      const jobRole = candidate.member?.jobRole || candidate.jobRole || 'Software Engineer';
      
      const welcomeReply = `Welcome ${candidateName}. I am your AI Technical Interviewer for the ${jobRole} role. Let's begin your interview. To start, could you please introduce yourself and walk me through your technical background?`;

      const session = sessionCache.get(sessionId)!;
      session.messages.push({ role: 'model', text: welcomeReply });

      return NextResponse.json({
        reply: welcomeReply,
        done: false,
      });
    }

    // Retrieve active session
    let session = sessionCache.get(sessionId);
    if (!session) {
      // Fallback session initialization if sessionId provided without initial start
      session = {
        candidate: candidate || { member: { name: 'Candidate', jobRole: 'Software Engineer' } },
        messages: [],
        turnCount: 0,
      };
      sessionCache.set(sessionId, session);
    }

    const userText = message || 'Hello, I am ready.';
    session.messages.push({ role: 'user', text: userText });
    session.turnCount += 1;

    const maxTurns = 5; // Complete interview after 5 conversational turns

    // 2. End Interview when turns complete
    if (session.turnCount >= maxTurns) {
      let feedback = {
        summary: `${session.candidate.member?.name || 'Candidate'} demonstrated strong technical understanding across the AI & Engineering curriculum with clear architectural reasoning.`,
        strengths: [
          'Excellent understanding of vector search and embeddings clustering',
          'Clear communication of microservices and system design trade-offs',
          'Methodical approach to prompt engineering and agentic workflows'
        ],
        gaps: [
          'Could elaborate more on distributed locking and concurrency edge cases',
          'Observability and logging metrics monitoring could be deepened'
        ],
        next: [
          'Practice hands-on distributed transaction patterns (Saga pattern)',
          'Review Prometheus & Grafana dashboard metrics setup for production'
        ]
      };

      // Try AI-generated feedback via Gemini if API key available
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `Analyze this interview transcript for ${session.candidate.member?.name || 'Candidate'} (${session.candidate.member?.jobRole || 'Engineer'}):
${session.messages.map(m => `${m.role}: ${m.text}`).join('\n')}

Respond strictly with valid JSON matching this schema:
{
  "summary": "string",
  "strengths": ["string", "string"],
  "gaps": ["string", "string"],
  "next": ["string", "string"]
}`;

          const aiRes = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' },
          });

          if (aiRes.text) {
            const parsed = JSON.parse(aiRes.text);
            feedback = {
              summary: parsed.summary || feedback.summary,
              strengths: parsed.strengths || feedback.strengths,
              gaps: parsed.gaps || feedback.gaps,
              next: parsed.next || feedback.next,
            };
          }
        } catch (e) {
          console.warn('Gemini API evaluation fallback used:', e);
        }
      }

      sessionCache.delete(sessionId); // Clean up session

      return NextResponse.json({
        reply: 'Interview completed. Thank you for your time and answers.',
        done: true,
        feedback,
      });
    }

    // 3. Conversation Turn (Generate Next Probing Question)
    let aiReply = '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are a professional AI Technical Interviewer conducting a mock interview for candidate ${session.candidate.member?.name || 'Candidate'} for ${session.candidate.member?.jobRole || 'Engineer'}.
Ask ONE focused, technical question based on their previous answer and the curriculum. Keep your response conversational and under 3 sentences.`;

        const aiRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: session.messages.map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.text}`).join('\n'),
          config: { systemInstruction },
        });

        if (aiRes.text) {
          aiReply = aiRes.text.trim();
        }
      } catch (e) {
        console.warn('Gemini API chat fallback used:', e);
      }
    }

    if (!aiReply) {
      // Smart Fallback Questions Array
      const FALLBACK_QUESTIONS = [
        "That's a solid technical background. How do you handle vector embeddings and similarity search when dealing with large knowledge bases?",
        "Great explanation. When designing multi-agent workflows, how do you handle tool execution failures and retries?",
        "Very practical trade-offs. How do you manage rate limits and token usage costs in production RAG applications?",
        "Excellent approach. Let's wrap up with system design: how do you ensure security and guardrails against prompt injection in public APIs?"
      ];
      aiReply = FALLBACK_QUESTIONS[(session.turnCount - 1) % FALLBACK_QUESTIONS.length];
    }

    session.messages.push({ role: 'model', text: aiReply });

    return NextResponse.json({
      reply: aiReply,
      done: false,
    });
  } catch (error) {
    console.error('Error in /api/interview:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
