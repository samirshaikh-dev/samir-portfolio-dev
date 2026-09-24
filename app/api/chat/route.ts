import {
  streamText,
  generateObject,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  tool,
  jsonSchema,
} from 'ai';
import { getChatModel } from '@/lib/ai-config';
import { runSecurityChecks } from '@/lib/chat/security';
import { getRelevantContextWithSources } from '@/lib/chat/retrieval';
import { getSystemPrompt } from '@/lib/chat/prompt';
import {
  detectFollowUpTopic,
  getFollowUpPrompt,
  followUpsSchema,
  sanitizeFollowUps,
} from '@/lib/chat/followups';
import { db } from '@/lib/db';
import { contact as contactSchema } from '@/lib/schema';
import { sendContactConfirmationEmail, sendAdminContactNotification } from '@/lib/email';

export const maxDuration = 30;

const contactInquirySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string', description: 'Name of the visitor' },
    email: { type: 'string', description: 'Email address of the visitor' },
    message: { type: 'string', description: 'Brief description of project or message for Samir' },
    subject: { type: 'string', description: 'Optional subject line' },
  },
  required: ['name', 'email', 'message'],
} as const;

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

    const { contextText, sources } = await getRelevantContextWithSources(recentMessages);
    const systemPrompt = getSystemPrompt(contextText);

    const stream = createUIMessageStream({
      onError: (error) => {
        console.error('Chat Stream Error:', error);
        return 'The AI assistant is temporarily unavailable. Please try again shortly or reach out to Samir directly.';
      },
      async execute({ writer }) {
        if (sources.length > 0) {
          writer.write({
            type: 'data-sources',
            data: sources,
          });
        }

        const result = streamText({
          model: getChatModel(),
          system: systemPrompt,
          messages: await convertToModelMessages(messages),
          tools: {
            sendContactInquiry: tool({
              description:
                'Submit a contact inquiry or message directly to Samir when the user provides their name, email, and message.',
              inputSchema: jsonSchema<{
                name: string;
                email: string;
                message: string;
                subject?: string;
              }>(contactInquirySchema as unknown as Parameters<typeof jsonSchema>[0]),
              execute: async ({ name, email, message, subject }) => {
                try {
                  const cleanName = name.trim();
                  const cleanEmail = email.trim();
                  const cleanMessage = message.trim();
                  const cleanSubject = (subject && subject.trim()) || 'Chatbot Portfolio Inquiry';

                  await db.insert(contactSchema).values({
                    name: cleanName,
                    email: cleanEmail,
                    subject: cleanSubject,
                    message: cleanMessage,
                  });

                  Promise.allSettled([
                    sendContactConfirmationEmail({
                      name: cleanName,
                      email: cleanEmail,
                      subject: cleanSubject,
                      message: cleanMessage,
                    }),
                    sendAdminContactNotification({
                      name: cleanName,
                      email: cleanEmail,
                      subject: cleanSubject,
                      message: cleanMessage,
                    }),
                  ]).catch((e) => console.error('[Chat] Email notification error:', e));

                  return {
                    success: true,
                    confirmation: `Inquiry successfully delivered to Samir. He will follow up at ${cleanEmail}.`,
                  };
                } catch (err) {
                  console.error('[Chat] Failed to record inquiry:', err);
                  return {
                    success: false,
                    error: 'Could not record message right now. Please submit via /contact.',
                  };
                }
              },
            }),
          },
        });

        writer.merge(result.toUIMessageStream());

        if (process.env.ENABLE_CHAT_FOLLOWUPS === 'false') return;

        try {
          const [answer, finishReason] = await Promise.all([result.text, result.finishReason]);
          if (finishReason === 'error' || !answer.trim()) return;

          const latestUserQuery = recentMessages[recentMessages.length - 1] || '';
          const detectedTopic = detectFollowUpTopic(latestUserQuery);

          const { object } = await generateObject({
            model: getChatModel(),
            schema: followUpsSchema,
            prompt: getFollowUpPrompt({ detectedTopic, recentMessages, answer, contextText }),
          });

          const followUps = sanitizeFollowUps(object?.followUps ?? [], detectedTopic);
          if (followUps.length > 0) {
            writer.write({
              type: 'data-followUps',
              data: followUps,
            });
          }
        } catch (error) {
          console.error('[Chat] Follow-up generation skipped:', error);
        }
      },
    });

    return createUIMessageStreamResponse({ stream });
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
