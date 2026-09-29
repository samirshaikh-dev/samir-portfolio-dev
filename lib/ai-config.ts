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

  if (process.env.NODE_ENV !== 'production') {
    if (provider === 'google' && model.toLowerCase().includes('llama')) {
      console.warn(
        `[ai-config] Warning: AI_CHAT_PROVIDER is 'google' but AI_CHAT_MODEL ('${model}') appears to be a Groq/Llama model.`
      );
    } else if (provider === 'groq' && model.toLowerCase().includes('gemini')) {
      console.warn(
        `[ai-config] Warning: AI_CHAT_PROVIDER is 'groq' but AI_CHAT_MODEL ('${model}') appears to be a Google/Gemini model.`
      );
    }
  }

  switch (provider) {
    case 'google':
      return google(model);
    case 'groq':
    default:
      return groq(model);
  }
}

/**
 * Returns a lightweight, high-throughput model specifically for generating
 * follow-up inquiry suggestions. Defaults to llama-3.1-8b-instant (Groq)
 * or gemini-1.5-flash (Google) to minimize token cost and latency.
 */
export function getFollowUpModel(): LanguageModel {
  const provider = getAiChatProvider();
  const defaultFollowUp = provider === 'google' ? 'gemini-1.5-flash' : 'llama-3.1-8b-instant';
  const model = process.env.AI_FOLLOWUP_MODEL ?? defaultFollowUp;

  switch (provider) {
    case 'google':
      return google(model);
    case 'groq':
    default:
      return groq(model);
  }
}