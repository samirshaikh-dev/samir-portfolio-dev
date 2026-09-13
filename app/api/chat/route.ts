import { streamText, convertToModelMessages } from 'ai';
import { groq } from '@ai-sdk/groq';
import { runSecurityChecks } from '@/lib/chat/security';
import { getRelevantContext } from '@/lib/chat/retrieval';
import { getSystemPrompt } from '@/lib/chat/prompt';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { errorResponse } = await runSecurityChecks(req);
    if (errorResponse) return errorResponse;
    const { messages } = await req.clone().json();
    type MessagePart = { text?: string };
    type ChatInputMessage = { content?: string; parts?: MessagePart[] };
    const recentMessages = (messages || [])
      .slice(-5)
      .map((m: ChatInputMessage) => m.content || (m.parts ? m.parts.map((p: MessagePart) => p.text || '').join('') : ''));

    const contextText = await getRelevantContext(recentMessages);
    const systemPrompt = getSystemPrompt(contextText);

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('Chat Stream Error:', error);
        return 'The AI assistant is temporarily unavailable. Please try again shortly or reach out to Samir directly.';
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({
        error: 'The AI assistant is temporarily unavailable. Please try again shortly or reach out to Samir directly.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
