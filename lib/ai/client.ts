import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({
  apiKey: apiKey || 'placeholder-key-for-build',
});

export const GEMINI_MODEL = 'gemini-2.5-flash';
