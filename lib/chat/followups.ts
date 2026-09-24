import { jsonSchema } from 'ai';

export interface FollowUp {
  label: string;
  question: string;
}

export type FollowUpTopic =
  | 'services'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'resume';

const TOPIC_KEYWORDS: Record<FollowUpTopic, string[]> = {
  services: [
    'service',
    'offer',
    'web development',
    'web design',
    'seo',
    'digital marketing',
    'whatsapp automation',
    'automation',
    'hire',
    'freelance',
    'pricing',
    'cost',
    'quote',
    'deliverable',
    'package',
  ],
  projects: [
    'project',
    'built',
    'portfolio',
    'demo',
    'application',
    'app',
    'chit-pit',
    'case study',
  ],
  skills: [
    'skill',
    'stack',
    'technolog',
    'tool',
    'framework',
    'backend',
    'frontend',
    'full stack',
    'full-stack',
    'language',
    'python',
    'nextjs',
    'react',
    'typescript',
    'drizzle',
    'rag',
    'vector',
    'agent',
  ],
  experience: [
    'experience',
    'worked',
    'job',
    'career',
    'company',
    'employment',
    'role',
    'position',
    'history',
    'fde',
    'engineer',
  ],
  education: [
    'education',
    'degree',
    'studied',
    'university',
    'college',
    'school',
    'course',
  ],
  contact: [
    'contact',
    'reach',
    'email',
    'phone',
    'call',
    'connect',
    'get in touch',
    'message',
  ],
  resume: [
    'resume',
    'cv',
    'download',
    'pdf',
  ],
};

const TOPIC_FALLBACKS: Record<FollowUpTopic, FollowUp[]> = {
  services: [
    { label: 'Web Development Services', question: 'What website development services does Samir offer?' },
    { label: 'SEO & Marketing Solutions', question: 'Does Samir provide SEO and digital marketing services?' },
    { label: 'Recent Projects', question: 'Can I see some of his recent featured projects?' },
  ],
  projects: [
    { label: 'Featured Projects', question: 'What are Samir\'s most complex full-stack or AI projects?' },
    { label: 'Tech Stack Used', question: 'What technologies does he typically build projects with?' },
    { label: 'Explore Services', question: 'What engineering services does Samir provide?' },
  ],
  skills: [
    { label: 'AI & RAG Skills', question: 'What experience does Samir have with AI agents and RAG pipelines?' },
    { label: 'Backend Architecture', question: 'How does he design scalable backends and APIs?' },
    { label: 'Work Experience', question: 'Where has Samir worked and what were his roles?' },
  ],
  experience: [
    { label: 'Engineering Roles', question: 'What engineering positions and clients has Samir worked with?' },
    { label: 'Notable Achievements', question: 'What were some of his key technical accomplishments?' },
    { label: 'Hire or Collaborate', question: 'How can I contact Samir to discuss an engineering opportunity?' },
  ],
  education: [
    { label: 'Academic Background', question: 'What degree and technical education did Samir pursue?' },
    { label: 'Technical Stack', question: 'What core technologies did he master?' },
    { label: 'View Resume', question: 'How can I view or download Samir\'s resume?' },
  ],
  contact: [
    { label: 'Contact Details', question: 'What is the best way to contact Samir directly?' },
    { label: 'Engineering Offerings', question: 'What services or freelance consulting does he accept?' },
    { label: 'Download Resume', question: 'Where can I find and download his resume?' },
  ],
  resume: [
    { label: 'Download Resume', question: 'How can I download Samir\'s official resume PDF?' },
    { label: 'Top Projects', question: 'What are his standout portfolio projects?' },
    { label: 'Get in Touch', question: 'How can I schedule a call or message Samir?' },
  ],
};

export function detectFollowUpTopic(query: string): FollowUpTopic | null {
  if (!query || typeof query !== 'string') return null;
  const lower = query.toLowerCase();
  const words = lower.split(/[^a-z0-9_-]+/).filter(Boolean);

  let bestTopic: FollowUpTopic | null = null;
  let highestScore = 0;

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS) as [FollowUpTopic, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (kw.includes(' ')) {
        if (lower.includes(kw)) score += 2;
      } else {
        if (words.some((w) => w.startsWith(kw) || kw.startsWith(w))) {
          score += 1;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  return highestScore > 0 ? bestTopic : null;
}

export const followUpsJsonSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    followUps: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          label: {
            type: 'string',
            description: 'Short clickable button label (<= 6 words, e.g. "Explore Services", "Featured Projects")',
          },
          question: {
            type: 'string',
            description: 'The natural question to ask Samir\'s AI assistant when the chip is clicked',
          },
        },
        required: ['label', 'question'],
      },
      minItems: 2,
      maxItems: 3,
    },
  },
  required: ['followUps'],
} as const;

export const followUpsSchema = jsonSchema<{
  followUps: FollowUp[];
}>(followUpsJsonSchema as unknown as Parameters<typeof jsonSchema>[0]);

export function getFollowUpPrompt({
  detectedTopic,
  recentMessages,
  answer,
  contextText,
}: {
  detectedTopic: FollowUpTopic | null;
  recentMessages: string[];
  answer: string;
  contextText: string;
}): string {
  const latestQuery = recentMessages[recentMessages.length - 1] || '';
  const conversationSummary = recentMessages.slice(-4).join('\n---\n');

  return `You are generating 2 to 3 contextual follow-up question suggestions for Samir's portfolio AI assistant.
A user just had this exchange with the assistant:

<CONVERSATION>
${conversationSummary}
</CONVERSATION>

<LATEST_USER_QUERY>
${latestQuery}
</LATEST_USER_QUERY>

<LATEST_AI_ANSWER>
${answer.slice(0, 1200)}
</LATEST_AI_ANSWER>

<PORTFOLIO_REFERENCE_SUMMARY>
${contextText.slice(0, 1800)}
</PORTFOLIO_REFERENCE_SUMMARY>

RULES FOR GENERATING SUGGESTIONS:
1. DETECTED TOPIC: ${detectedTopic ? `"${detectedTopic.toUpperCase()}"` : 'None specifically detected'}.
2. TOPIC ANCHORING: ${
    detectedTopic
      ? `Because a strong topic was detected, at least 2 of the 3 suggestions MUST be directly focused on ${detectedTopic}. The remaining 1 suggestion may explore a complementary topic (e.g. projects, experience, services, contact).`
      : 'Generate 2 to 3 natural, highly engaging follow-up questions directly related to the discussion or Samir\'s portfolio.'
  }
3. NO REDUNDANCY: Never re-ask the exact question the user just asked (${latestQuery}).
4. GROUNDED: Only suggest questions that Samir\'s portfolio context can actually answer (services, projects, tech stack, experience, resume, contact).
5. FORMAT:
   - "label": Short, punchy, clickable button text (<= 6 words). Example: "View Web Services", "Explore AI Projects".
   - "question": The complete natural question sent to the chat when clicked.
6. Provide exactly 2 or 3 items.`;
}

export function sanitizeFollowUps(raw: unknown, detectedTopic: FollowUpTopic | null): FollowUp[] {
  const result: FollowUp[] = [];

  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (
        item &&
        typeof item === 'object' &&
        typeof (item as { label?: unknown }).label === 'string' &&
        typeof (item as { question?: unknown }).question === 'string'
      ) {
        const label = (item as { label: string }).label.trim().replace(/\s+/g, ' ');
        const question = (item as { question: string }).question.trim().replace(/\s+/g, ' ');

        if (label && question && label.length <= 80 && question.length <= 250) {
          // Avoid exact duplicates
          if (!result.some((r) => r.label.toLowerCase() === label.toLowerCase() || r.question.toLowerCase() === question.toLowerCase())) {
            result.push({ label, question });
          }
        }
      }
      if (result.length >= 3) break;
    }
  }

  // Fallback if model returned empty or fewer than 2
  if (result.length < 2 && detectedTopic && TOPIC_FALLBACKS[detectedTopic]) {
    const fallbacks = TOPIC_FALLBACKS[detectedTopic];
    for (const fb of fallbacks) {
      if (!result.some((r) => r.label.toLowerCase() === fb.label.toLowerCase())) {
        result.push(fb);
      }
      if (result.length >= 3) break;
    }
  }

  return result.slice(0, 3);
}
