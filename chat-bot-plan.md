# AI Chatbot — Contextual Follow-up Question System

## Goal
Add a keyword-driven follow-up suggestion system to the portfolio AI chatbot. After
every AI answer, 2-3 contextual follow-up chips appear *outside* the reply bubble.
Clicking one sends it exactly as if typed.

## Architecture
Single `/api/chat` POST stays intact:

1. **Answer** streams as today (no UX change).
2. After the answer completes, a second lightweight `generateObject` call produces
   2-3 follow-ups, delivered as a typed `data-followUps` UI-message part (never
   rendered as text inside the bubble).
3. **Fail-open:** if follow-up generation fails, the chat works exactly as before.

No new dependencies. Uses `jsonSchema()` from the already-installed `ai` package
(project has no zod).

## Files
| File | Action |
|---|---|
| `lib/chat/followups.ts` | NEW — types, topic detection, prompt, JSON schema, sanitizer, topic guard |
| `app/api/chat/route.ts` | MODIFY — merged stream: answer + `data-followUps` part |
| `components/Chatbot.tsx` | MODIFY — extract follow-ups, render chips, click-to-send, empty-state starters, scroll |

---

## 1. `lib/chat/followups.ts` (new)

### Types
```ts
export interface FollowUp { label: string; question: string }
export type FollowUpTopic =
  | 'services' | 'projects' | 'skills' | 'experience'
  | 'education' | 'contact' | 'resume';
```

### Topic detection (deterministic, keyword-scored)
```ts
const TOPIC_KEYWORDS: Record<FollowUpTopic, string[]> = {
  services:    ['service','offer','web development','web design','seo',
                'digital marketing','whatsapp automation','hire','freelance',
                'pricing','cost','deliverable'],
  projects:    ['project','built','portfolio','demo','application','app'],
  skills:      ['skill','stack','technolog','tool','framework','backend','frontend',
                'full stack','full-stack','language'],
  experience:  ['experience','worked','job','career','company','employment','role',
                'position','history'],
  education:   ['education','degree','studied','university','college'],
  contact:     ['contact','reach','email','hire me','connect','get in touch'],
  resume:      ['resume','cv','download'],
};
```
- Tokenize the **latest user query** (lowercase, split on non-word chars).
- Single-word hits scored +1 (prefix match: `services` matches `service`).
- Multi-word keyword substring hits scored +2 (strong signal).
- Return the highest-scoring topic, or `null` if score is 0 (no-topic fallback).

### `getFollowUpPrompt({ detectedTopic, recentMessages, answer, contextText })`
Rules embedded in the prompt (per product spec):
- Analyze the user's **most recent query first**; identify its primary topic.
- **Strong topic detected** → at least **2 of 3** suggestions directly related to
  that topic; the remaining 1 may explore a different relevant topic (projects,
  skills, experience, contact, etc.).
- Example wired into the prompt: user asks "What services does Samir provide?" →
  1. "What website development services does he offer?"
  2. "Does he provide SEO and digital marketing services?"
  3. "Can I see some of his recent projects?"
- Same logic applies to `projects, skills, experience, SEO, web development, web
  design, digital marketing, WhatsApp automation, contact`, etc.
- **No clear topic** → 3 generally relevant suggestions based on the answer and
  conversation.
- Never repeat the exact question just asked; only suggest questions answerable
  from portfolio context; short clickable labels (<= ~6 words); valid JSON only.
- Real conversation + completed answer in `<CONVERSATION>` / `<ANSWER>`;
  compact `contextText` (truncated ~3000 chars) in `<CONTEXT>` for grounding.

### JSON Schema (plain object, wrapped with `jsonSchema()`)
```ts
export const followUpsJsonSchema = {
  type: 'object',
  properties: { followUps: { type: 'array', items: {
    type: 'object', additionalProperties: false,
    properties: { label: { type: 'string' }, question: { type: 'string' } },
    required: ['label', 'question'] } } },
  required: ['followUps'],
} as const;
```

### `sanitizeFollowUps(raw: unknown, detectedTopic)`
- Validate shape; cap at 3; trim/collapse whitespace; drop empties, dupes,
  label > 80 chars, question > 200 chars; fallback `[]`.
- **Topic guarantee (belt-and-suspenders):** when a topic was detected and fewer
  than 2 of the kept suggestions reference it (keyword/synonym match), prepend
  topic-anchored fallback suggestions so the "at least 2 on-topic" rule holds even
  if the model drifts.

---

## 2. `app/api/chat/route.ts` (modify)

```ts
const stream = createUIMessageStream({
  onError: (error) => {
    console.error('Chat Stream Error:', error);
    return 'The AI assistant is temporarily unavailable. Please try again shortly or reach out to Samir directly.';
  },
  async execute({ writer }) {
    const result = streamText({
      model: getChatModel(),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });
    writer.merge(result.toUIMessageStream());                // answer streams as today

    if (process.env.ENABLE_CHAT_FOLLOWUPS === 'false') return; // kill-switch

    try {
      const [answer, finishReason] = await Promise.all([result.text, result.finishReason]);
      if (finishReason === 'error' || !answer.trim()) return;

      const latestUserQuery = recentMessages[recentMessages.length - 1] || '';
      const detectedTopic = detectFollowUpTopic(latestUserQuery);

      const { object } = await generateObject({
        model: getChatModel(),
        schema: jsonSchema(followUpsJsonSchema),
        prompt: getFollowUpPrompt({ detectedTopic, recentMessages, answer, contextText }),
      });

      const followUps = sanitizeFollowUps(object?.followUps ?? [], detectedTopic);
      if (followUps.length > 0) {
        writer.write({ type: 'data-followUps', data: followUps });
      }
    } catch (error) {
      console.error('[Chat] Follow-up generation skipped:', error);  // fail-open
    }
  },
});

return createUIMessageStreamResponse({ stream });
```
- Reuses already-fetched `recentMessages` + `contextText` — no extra RAG work.
- One security/rate-limit check per request (unchanged, runs once).
- `maxDuration = 30` remains sufficient (answer streams; follow-up call ~1-2s).

---

## 3. `components/Chatbot.tsx` (modify)

### Typing
```ts
interface FollowUp { label: string; question: string }
type FollowUpMessage = UIMessage<unknown, { followUps: FollowUp[] }>;
// useChat<FollowUpMessage>()
```

### Extraction (last assistant message only)
```ts
function getFollowUps(m: FollowUpMessage): FollowUp[] {
  return m.parts.filter((p) => p.type === 'data-followUps')
    .at(-1)?.data ?? [];
}
```

### Rendering (outside the bubble, navigation-style)
- Only the **last** assistant message shows chips; hidden during `submitted`/
  `streaming` and on older messages.
- Structure: reply bubble unchanged, then a sibling block:
  - Muted caption "Continue exploring" (`text-[10px] uppercase tracking-wide`).
  - Flex-wrapped chip buttons using existing tokens: `bg-black/5 dark:bg-white/5`,
    `border-black/10 dark:border-white/10`, `rounded-full`, `text-xs`,
    `hover:bg-black/10 dark:hover:bg-white/10`, focus-visible ring.
  - Message container becomes `flex-col items-start` when chips are shown.

### Click-to-send (shared helper)
```ts
const sendWithHeaders = (text: string) => {
  if (!text.trim() || isLoading) return;
  sendMessage({ text }, { headers: visitorId ? { 'x-visitor-id': visitorId } : {} });
};
```
Used by `handleSubmit`, chips (`question`), and starters.

### Empty-state starters
Static 3 items under the greeting: "What projects has Samir built?",
"What services does he offer?", "How can I contact Samir?" — styled as chips.

### Auto-scroll
Add `lastFollowUps.length` to the scroll effect deps (data part arrives without
`messages.length` changing).

---

## Edge Cases
- Invalid/empty `generateObject` output -> no chips, chat unaffected.
- Stream error or security notice -> `finishReason === 'error'` skips follow-ups.
- Stale chips -> only latest assistant message ever renders them.
- Chips disabled while a new request is in flight (`isLoading`).
- `ENABLE_CHAT_FOLLOWUPS=false` kills the feature at the route level.

## Verification
1. `pnpm run lint`
2. `pnpm run build`
3. `pnpm run dev` browser checks:
   - Keyword path: "What services does Samir provide?" -> 2 services + 1 other.
   - No-topic path: generic question -> 3 relevant suggestions.
   - Click-through: chip sends its `question`; conversation continues.
   - Fail-open: temporarily break follow-up generation -> answer still streams.