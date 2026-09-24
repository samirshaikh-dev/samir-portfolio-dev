# AI Chatbot — Comprehensive Feature & Enhancement Plan

This document outlines the architecture, specifications, and implementation roadmap for the portfolio AI Chatbot, enhancing Samir's portfolio with agentic capabilities, rich UX, transparent RAG grounding, and contextual guidance.

---

## Roadmap & Implementation Phases

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Contextual Follow-up Questions & Starter System (High Priority)│
├────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Session Persistence & Quick Controls (Copy, Clear, Shortcuts) │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 3: RAG Grounding Citations & Sources Consulted Accordion         │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 4: In-Chat Lead Capture via Agentic Tool Calling (`sendInquiry`) │
├────────────────────────────────────────────────────────────────────────┤
│ Phase 5: Generative UI & Interactive Mini-Cards for Projects/Services  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Contextual Follow-up Questions & Starter System

### 1. Goal
Add a keyword-driven follow-up suggestion system. After every AI response, 2–3 contextual follow-up chips appear *outside* the reply bubble. Clicking one sends it directly as the next message.

### 2. Stream Architecture
Single `POST /api/chat` endpoint remains intact:
1. **Answer** streams via `streamText` and `writer.merge(result.toUIMessageStream())`.
2. After the answer completes, a lightweight `generateObject` call produces 2–3 follow-up suggestions, sent as a typed `data-followUps` part on the UI message stream (never concatenated into the text bubble).
3. **Fail-Open:** If follow-up generation fails or is disabled via `ENABLE_CHAT_FOLLOWUPS=false`, the chat streams normally without interruption.

### 3. File Specification

#### A. `lib/chat/followups.ts` (New File)
- **Types**:
  ```ts
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
  ```
- **Topic Detection (Deterministic Keyword Scoring)**:
  Scans the user's latest query against topic dictionary (`services`, `projects`, `skills`, `experience`, `education`, `contact`, `resume`).
  - Single-word match: +1.
  - Multi-word substring match: +2.
  - Returns highest-scoring topic, or `null` if 0.
- **Prompt Strategy**:
  - If a topic is strongly detected: at least **2 of 3** suggestions directly explore that topic, and 1 explores a complementary topic.
  - If no clear topic: 3 generally relevant suggestions based on conversation context.
  - Strict brevity: short label (<= 6 words) and clear question.
- **JSON Schema**:
  ```ts
  export const followUpsJsonSchema = {
    type: 'object',
    properties: {
      followUps: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            label: { type: 'string' },
            question: { type: 'string' },
          },
          required: ['label', 'question'],
        },
      },
    },
    required: ['followUps'],
  } as const;
  ```
- **`sanitizeFollowUps(raw, detectedTopic)`**:
  - Validates shape, caps at 3, strips empty/duplicate entries.
  - Topic anchor guarantee: prepends fallback questions if model output drifts.

#### B. `app/api/chat/route.ts` (Integration)
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
    writer.merge(result.toUIMessageStream());

    if (process.env.ENABLE_CHAT_FOLLOWUPS === 'false') return;

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
      console.error('[Chat] Follow-up generation skipped:', error);
    }
  },
});

return createUIMessageStreamResponse({ stream });
```

#### C. `components/Chatbot.tsx` (UI & Interaction)
- **Typed Message Parts**:
  ```ts
  interface FollowUp { label: string; question: string }
  type ExtendedUIMessage = UIMessage<unknown, { followUps: FollowUp[] }>;
  ```
- **Display Location**: Renders below the assistant bubble only for the **most recent** completed message.
- **Styling**: Sleek pill chips with subtle border, hover micro-transitions (`bg-black/5 dark:bg-white/5`, `hover:bg-black/10 dark:hover:bg-white/10`).
- **Empty State Starters**: 3 static chips displayed on empty state under the greeting.
- **Click Handler**: Triggers `sendMessage` with fingerprint headers.

---

## Phase 2: Session Persistence & Quick Controls

### 1. Goal
Provide seamless multi-page continuity and user-friendly chat management.

### 2. Specifications

#### A. Session Storage Persistence (`sessionStorage`)
- When user navigates across pages (`/projects` -> `/blogs`), preserve messages so opening the assistant continues the conversation.
- Use `sessionStorage` key: `samir_portfolio_chat_messages_v1`.
- Sync state safely after component mounts to avoid SSR hydration mismatches.

#### B. Quick Controls in Chat Drawer Header
- **Clear Conversation Button**: A trash/rotate icon next to the close `X` button with tooltip "Clear chat". Calls `setMessages([])` and removes `sessionStorage` key.
- **Copy Message Action**:
  - Subtle copy icon on assistant message hover (or tap on mobile).
  - Displays checkmark feedback icon for 2 seconds upon copy.
- **Keyboard Shortcuts**:
  - Global `Cmd+K` / `Ctrl+K` to toggle chat open/closed from any page.
  - `Escape` key closes the open drawer.

---

## Phase 3: RAG Grounding Citations & Sources Consulted

### 1. Goal
Demonstrate production RAG transparency by showing the user which vector chunks, service offerings, or GitHub activity grounded the answer.

### 2. Stream & Backend Architecture
- In `lib/chat/retrieval.ts`, capture metadata of matching sources:
  ```ts
  export interface GroundingSource {
    title: string;
    type: 'project' | 'blog' | 'service' | 'experience' | 'github' | 'faq';
    url?: string;
  }
  ```
- In `app/api/chat/route.ts`, write a typed stream part before or alongside the text:
  ```ts
  writer.write({
    type: 'data-sources',
    data: retrievedSources,
  });
  ```

### 3. UI Component (`components/Chatbot.tsx`)
- Render a compact collapsible badge below the answer:
  - *"Sources consulted: Chit-Pit, RAG Architecture, GitHub Events"*
  - Clicking expands a small popover or pill row with links directly to the relevant portfolio section.

---

## Phase 4: In-Chat Lead Capture via Tool Calling

### 1. Goal
Demonstrate **Agentic AI** capabilities by enabling the assistant to collect visitor inquiries directly in conversation and submit them to `/api/contact`.

### 2. Tool Architecture
Define a client/server tool in Vercel AI SDK:
```ts
tools: {
  sendContactInquiry: tool({
    description: 'Capture contact details and a project inquiry from a visitor who wants to hire Samir, get a quote, or collaborate.',
    parameters: jsonSchema({
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the visitor' },
        email: { type: 'string', description: 'Email address of the visitor' },
        message: { type: 'string', description: 'Summary of the project or message' },
      },
      required: ['name', 'email', 'message'],
    }),
    execute: async ({ name, email, message }) => {
      // Validates and saves inquiry to Neon DB contact table / sends notification
      return { success: true, message: 'Inquiry forwarded to Samir.' };
    },
  }),
}
```

### 3. UI Feedback
- The chat renders an inline inquiry confirmation card:
  - *"Message sent to Samir! He typically replies within 24 hours."*

---

## Phase 5: Generative UI & Interactive Mini-Cards

### 1. Goal
Replace plain markdown links with rich interactive cards for portfolio projects and services.

### 2. Specifications
- Custom Markdown renderers for internal links:
  - Links to `/projects/[slug]` render an interactive project card preview with tags and "View Case Study" button.
  - Links to `/services#[id]` render a service tier badge with starting price and "Inquire" action.
- Styled using the portfolio design system (`portfolio-theme.md`) with glassmorphism and subtle border glows.

---

## File Modification Matrix

| File | Phase | Scope |
| :--- | :---: | :--- |
| `lib/chat/followups.ts` | 1 | NEW: Follow-up types, topic scoring, prompt, schema, sanitization |
| `app/api/chat/route.ts` | 1, 3, 4 | Merged UIMessage stream, `data-followUps`, `data-sources`, agentic tools |
| `components/Chatbot.tsx` | 1, 2, 3, 5 | Chips, empty starters, `sessionStorage`, clear/copy buttons, shortcuts, cards |
| `lib/chat/retrieval.ts` | 3 | Return structured grounding sources metadata alongside text |
| `lib/chat/prompt.ts` | 1, 4 | Update instructions for tool calling and concise follow-up support |

---

## Non-Negotiable Agent Directives & Verification

1. **Safety & Zero Disruption:** Every new feature is fail-open. If a stream part or tool fails, the primary text stream remains unaffected.
2. **Design Tokens:** Strict adherence to [`portfolio-theme.md`](file:///s:/portfolio/samir-portfolio-dev/portfolio-theme.md) and Tailwind CSS v4 variables (`--color-primary`, `--color-background`, `--color-foreground`).
3. **Performance:** `Chatbot.tsx` remains wrapped in `components/LazyClientComponents.tsx` with `{ ssr: false }` to prevent SSR bundle bloat.
4. **Testing Verification:**
   - `pnpm run lint` — ESLint verification with zero warnings.
   - `pnpm run build` — Production Webpack build verification.
   - Manual browser flow testing (hotkeys, follow-up clicks, clear chat, error recovery).