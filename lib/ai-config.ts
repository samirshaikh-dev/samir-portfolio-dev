import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import type { LanguageModel } from 'ai';

export type AiChatProvider = 'groq' | 'google';

export function getAiChatProvider(): AiChatProvider {
  const provider = (process.env.AI_CHAT_PROVIDER ?? 'groq').toLowerCase();
  return provider === 'google' ? 'google' : 'groq';
}

export function getChatModel(): LanguageModel {
  const provider = getAiChatProvider();
  const model = process.env.AI_CHAT_MODEL ?? 'llama-3.3-70b-versatile';

  switch (provider) {
    case 'google':
      return google(model);
    case 'groq':
    default:
      return groq(model);
  }
}