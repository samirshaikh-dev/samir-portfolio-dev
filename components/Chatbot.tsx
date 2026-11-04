"use client";

import { useChat, UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRef, useEffect, useState, useCallback } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import {
  FiMessageSquare,
  FiSend,
  FiLoader,
  FiX,
  FiAlertCircle,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiArrowUpRight,
  FiExternalLink,
  FiChevronDown,
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import type { GroundingSource } from '@/lib/chat/retrieval';
import { analyticsEvents } from '@/lib/analytics/events';
import { trackEvent } from '@/lib/analytics/trackEvent';

interface FriendlyError {
  title: string;
  description: string;
}

interface FollowUp {
  label: string;
  question: string;
}

type FollowUpMessage = UIMessage<
  unknown,
  {
    followUps?: FollowUp[];
    sources?: GroundingSource[];
  }
>;

const STORAGE_KEY = 'samir_portfolio_chat_messages_v1';

const STARTERS = [
  {
    label: 'Can you build a website for my requirements?',
    question: 'Can you build a custom website or web application tailored to my specific business requirements?',
  },
  {
    label: 'Can we add AI into my existing website or SaaS?',
    question: 'Can we add an AI chatbot, semantic search, or custom RAG knowledge base directly into my existing website or SaaS?',
  },
  {
    label: 'Can you audit or fix my backend / MVP?',
    question: 'Can you audit, fix, or optimize the performance and queries of my existing codebase or broken MVP?',
  },
  {
    label: 'What are your project timelines & pricing?',
    question: 'How do you price engineering sprint projects, and what are your typical delivery timelines?',
  },
];

function getFriendlyErrorMessage(err: Error | undefined): FriendlyError {
  if (!err) {
    return {
      title: 'Something Went Wrong',
      description: "I'm temporarily having trouble connecting to the service. Please reach out to Samir directly.",
    };
  }

  let rawMessage = err.message || '';
  try {
    const parsed = JSON.parse(rawMessage);
    if (parsed.error) rawMessage = parsed.error;
  } catch {
    // keep rawMessage
  }

  if (
    rawMessage.startsWith('Whoa,') ||
    rawMessage.startsWith('Hey there!') ||
    rawMessage.startsWith('Missing visitor ID')
  ) {
    return {
      title: rawMessage.startsWith('Whoa') ? 'Daily Limit Reached' : 'Notice',
      description: rawMessage,
    };
  }

  const lower = rawMessage.toLowerCase();

  if (
    lower.includes('api key') ||
    lower.includes('unauthorized') ||
    lower.includes('forbidden') ||
    lower.includes('401') ||
    lower.includes('403') ||
    lower.includes('loadapikeyerror')
  ) {
    return {
      title: 'Assistant Service Offline',
      description: "The AI assistant is temporarily undergoing maintenance or credential updates. In the meantime, feel free to explore Samir's projects or reach out directly!",
    };
  }

  if (
    lower.includes('rate limit') ||
    lower.includes('too many requests') ||
    lower.includes('429') ||
    lower.includes('quota')
  ) {
    return {
      title: 'Rate Limit Reached',
      description: "I'm receiving a lot of questions right now! Please check back later or reach out to Samir directly.",
    };
  }

  if (
    lower.includes('failed to fetch') ||
    lower.includes('network') ||
    lower.includes('offline') ||
    lower.includes('econnrefused') ||
    lower.includes('timeout')
  ) {
    return {
      title: 'Connection Issue',
      description: 'Unable to reach the server. Please check your internet connection or reach out to Samir directly.',
    };
  }

  return {
    title: 'Temporary Hiccup',
    description: "I ran into an unexpected issue while generating a response. Please reach out to Samir directly.",
  };
}

function getFollowUps(m: FollowUpMessage | undefined): FollowUp[] {
  if (!m || !m.parts) return [];
  const part = m.parts.find((p) => p.type === 'data-followUps');
  return (part as { data?: FollowUp[] } | undefined)?.data ?? [];
}

function getGroundingSources(m: FollowUpMessage | undefined): GroundingSource[] {
  if (!m || !m.parts) return [];
  const part = m.parts.find((p) => p.type === 'data-sources');
  return (part as { data?: GroundingSource[] } | undefined)?.data ?? [];
}

function getAssistantText(m: FollowUpMessage): string {
  if (!m.parts) return '';
  return m.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { text: string }).text)
    .join('\n\n');
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorId, setVisitorId] = useState<string>('');
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { messages, sendMessage, status, error, clearError, setMessages } = useChat<FollowUpMessage>();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Restore chat messages from sessionStorage safely after mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load chat history from sessionStorage', e);
    }
  }, [setMessages]);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.error('Failed to save chat history to sessionStorage', e);
      }
    }
  }, [messages]);

  // Fingerprint and custom event listeners
  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };
    loadFingerprint();

    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.query) {
        setInput(customEvent.detail.query);
      }
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  // Global keyboard shortcuts: Cmd+K / Ctrl+K toggle, Escape close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Analytics event tracking
  useEffect(() => {
    if (isOpen) {
      trackEvent(analyticsEvents.chatOpen);
    }
  }, [isOpen]);

  const isLoading = status === 'submitted' || status === 'streaming';

  const sendWithHeaders = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean || isLoading) return;
      trackEvent(analyticsEvents.chatMessageSent);
      sendMessage({ text: clean }, { headers: visitorId ? { 'x-visitor-id': visitorId } : {} });
    },
    [isLoading, sendMessage, visitorId]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendWithHeaders(input);
    setInput('');
  };

  const handleClearChat = () => {
    setMessages([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    clearError();
  };

  const handleCopyMessage = async (id: string, text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Failed to copy text', e);
    }
  };

  const lastMessage = messages[messages.length - 1];
  const lastFollowUps = getFollowUps(lastMessage);
  const lastSources = getGroundingSources(lastMessage);

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, status, error, lastFollowUps.length, lastSources.length]);

  return (
    <>
      {/* ── FLOATING ACTION BUTTON (REFINED, NO NEON BLOBS) ────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-bold text-xs sm:text-sm border border-border-primary hover:opacity-90 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none ${
          isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Open AI Assistant (Ctrl+K)"
        title="Open AI Assistant (Ctrl+K)"
      >
        <span className="w-2 h-2 rounded-full bg-accent-lime dark:bg-[#0A0A0A]" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-wider font-bold">Ask AI</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-background/20 dark:bg-black/10 border border-background/20 dark:border-black/20">
          Ctrl+K
        </kbd>
        <FiMessageSquare className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Outside click backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── OFF-CANVAS DRAWER DIALOG ────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-dialog-title"
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[440px] bg-background dark:bg-card-bg border-l border-border-primary z-50 flex flex-col transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Screen Reader Live Region for status & announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isLoading ? "AI assistant is generating response..." : ""}
          {lastMessage?.role === 'assistant' && !isLoading ? "AI assistant completed response." : ""}
          {error ? `Notice: ${getFriendlyErrorMessage(error).title}` : ""}
        </div>

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-primary bg-background dark:bg-card-bg">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border-primary bg-background dark:bg-card-bg p-1">
              <Image
                src="/Logo.svg"
                alt="Samir Shaikh Logo"
                fill
                className="rounded object-contain dark:invert transition-all"
                sizes="32px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="chatbot-dialog-title" className="font-bold text-sm text-foreground tracking-tight">
                  Samir&apos;s AI Assistant
                </h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-primary text-text-muted bg-hover-bg/40 font-medium">
                  RAG ACTIVE
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Grounded in production projects, architecture &amp; services
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none"
              title="Close chat (Esc)"
              aria-label="Close chat (Esc)"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── MESSAGES AREA ───────────────────────────────────────────────────── */}
        <div
          role="log"
          aria-label="Conversation history"
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-2 my-auto">
              <div className="w-12 h-12 rounded-xl bg-background dark:bg-card-bg border border-border-primary flex items-center justify-center text-foreground">
                <FiMessageSquare className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                  Have a Project or Technical Requirement?
                </h3>
                <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
                  Ask about custom web development, adding AI into your product, codebase audits, or hiring Samir.
                </p>
              </div>

              <div className="w-full pt-2 space-y-2 text-left">
                <p className="text-[10px] uppercase tracking-wider font-mono font-semibold text-text-muted text-center">
                  Common Inquiries
                </p>
                <div className="flex flex-col gap-2 w-full">
                  {STARTERS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendWithHeaders(s.question)}
                      className="text-xs px-3.5 py-2.5 rounded-xl bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/40 hover:bg-hover-bg text-foreground transition-colors cursor-pointer text-left flex items-center justify-between group focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none"
                    >
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="text-text-muted group-hover:text-foreground transition-colors text-xs font-mono">
                        &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m: FollowUpMessage, mIdx: number) => {
            const isLastMessage = mIdx === messages.length - 1;
            const followUps = isLastMessage ? getFollowUps(m) : [];
            const sources = getGroundingSources(m);

            return (
              <div key={m.id} className="w-full">
                {m.role === 'user' ? (
                  <div className="flex flex-col items-end w-full">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 pr-1">
                      You
                    </span>
                    <div className="relative group max-w-[85%] rounded-2xl rounded-tr-xs px-4 py-3 text-xs sm:text-sm leading-relaxed bg-hover-bg border border-border-primary text-foreground">
                      {m.parts?.map((part, i) => {
                        if (part.type === 'text') {
                          return (
                            <div key={i} className="whitespace-pre-wrap font-medium">
                              {part.text}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      <span>Samir Shaikh AI</span>
                    </div>
                    <div className="relative group max-w-[92%] rounded-2xl rounded-tl-xs px-4 py-3 text-xs sm:text-sm leading-relaxed bg-background dark:bg-card-bg border border-border-primary text-foreground">
                      {m.parts?.map((part, i) => {
                        if (part.type === 'text') {
                          return (
                            <div
                              key={i}
                              className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-p:leading-relaxed prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-pre:bg-hover-bg prose-pre:border prose-pre:border-border-primary prose-pre:p-3 prose-pre:rounded-lg prose-code:font-mono prose-code:text-xs"
                            >
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({ href, children, ...props }) => {
                                    if (href && href.startsWith('/projects/')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-colors"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
                                            Case Study <FiArrowUpRight className="w-2.5 h-2.5" />
                                          </span>
                                        </Link>
                                      );
                                    }
                                    if (href && href.startsWith('/services')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-colors"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
                                            Sprint <FiArrowUpRight className="w-2.5 h-2.5" />
                                          </span>
                                        </Link>
                                      );
                                    }
                                    if (href && href.startsWith('/technical-skills')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-colors"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
                                            Architecture <FiArrowUpRight className="w-2.5 h-2.5" />
                                          </span>
                                        </Link>
                                      );
                                    }
                                    if (href && href.startsWith('/')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-colors"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                        </Link>
                                      );
                                    }
                                    return (
                                      <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime inline-flex items-center gap-0.5 transition-colors"
                                        {...props}
                                      >
                                        <span>{children}</span>
                                        <FiExternalLink className="w-2.5 h-2.5 opacity-70" />
                                      </a>
                                    );
                                  },
                                }}
                              >
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }
                        if (part.type === 'reasoning') {
                          return (
                            <div
                              key={i}
                              className="italic border-l-2 border-border-primary pl-3 my-2 text-xs text-text-muted bg-hover-bg/30 py-1.5 rounded-r-md"
                            >
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }

                        // In-chat Tool Execution UI (Agentic Contact Confirmation)
                        if (
                          (part as { type?: string }).type?.startsWith('tool-') ||
                          (part as { type?: string }).type === 'tool-invocation'
                        ) {
                          return (
                            <div
                              key={i}
                              className="my-2 p-3 rounded-xl bg-hover-bg border border-border-primary text-foreground text-xs space-y-1"
                            >
                              <div className="flex items-center gap-2 font-bold text-foreground">
                                <span className="p-0.5 rounded bg-accent-lime text-[#0A0A0A]">
                                  <FiCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                                </span>
                                <span>Inquiry Transmitted Directly to Samir</span>
                              </div>
                              <p className="text-text-secondary leading-relaxed pl-5">
                                Your message has been sent to Samir&apos;s direct inbox. He will follow up via email within 24 hours.
                              </p>
                            </div>
                          );
                        }

                        return null;
                      })}

                      {/* Copy response action */}
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(m.id, getAssistantText(m))}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-background dark:bg-card-bg border border-border-primary text-text-muted hover:text-foreground hover:bg-hover-bg opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none"
                        title="Copy response"
                        aria-label="Copy response text"
                      >
                        {copiedId === m.id ? (
                          <FiCheck className="w-3.5 h-3.5 text-foreground dark:text-accent-lime" />
                        ) : (
                          <FiCopy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Grounding Citations Accordion */}
                    {sources.length > 0 && (
                      <details className="mt-2 text-[11px] text-text-muted group/sources max-w-[92%] pl-1">
                        <summary className="cursor-pointer select-none inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shrink-0" />
                          <span>Grounded in {sources.length} {sources.length === 1 ? 'source' : 'sources'}</span>
                          <FiChevronDown className="w-3 h-3 group-open/sources:rotate-180 transition-transform" />
                        </summary>
                        <div className="mt-1.5 flex flex-wrap gap-1.5 pl-3 border-l border-border-primary py-0.5">
                          {sources.map((src, sIdx) => {
                            const isInternal = src.url && src.url.startsWith('/');
                            return (
                              <Link
                                key={sIdx}
                                href={src.url || '#'}
                                onClick={() => {
                                  if (isInternal) setIsOpen(false);
                                }}
                                target={src.url?.startsWith('http') ? '_blank' : undefined}
                                rel={src.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="px-2 py-0.5 rounded bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/30 hover:bg-hover-bg text-foreground transition-colors inline-flex items-center gap-1 text-[11px]"
                              >
                                <span className="capitalize text-[10px] font-mono text-text-muted">
                                  {src.type}:
                                </span>
                                <span className="font-medium truncate max-w-[180px]">{src.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </details>
                    )}

                    {/* Contextual Follow-up Chips */}
                    {isLastMessage && !isLoading && followUps.length > 0 && (
                      <div className="mt-3 space-y-1.5 max-w-[95%] pl-1">
                        <p className="text-[10px] uppercase tracking-wider font-mono font-semibold text-text-muted">
                          Suggested Next Questions
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {followUps.map((fu, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => sendWithHeaders(fu.question)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/40 hover:bg-hover-bg text-foreground transition-colors cursor-pointer text-left focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none inline-flex items-center gap-1.5 group"
                            >
                              <span>{fu.label}</span>
                              <span className="text-text-muted group-hover:text-foreground transition-colors text-xs font-mono">
                                &rarr;
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                <span>Samir Shaikh AI</span>
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-xs px-4 py-3 text-xs sm:text-sm bg-background dark:bg-card-bg border border-border-primary text-foreground flex items-center gap-2.5">
                <FiLoader className="w-3.5 h-3.5 animate-spin text-foreground dark:text-accent-lime" />
                <span className="text-text-secondary font-medium text-xs">Retrieving &amp; synthesizing answer...</span>
              </div>
            </div>
          )}

          {error && (() => {
            const { title, description } = getFriendlyErrorMessage(error);
            return (
              <div className="flex justify-start w-full">
                <div className="max-w-[92%] rounded-2xl rounded-tl-xs p-4 text-xs sm:text-sm bg-background dark:bg-card-bg border border-border-primary text-foreground space-y-3">
                  <div className="flex items-start gap-2.5">
                    <FiAlertCircle className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-xs tracking-wide uppercase font-mono text-foreground">
                        {title}
                      </p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border-primary">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1 rounded-lg bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
                    >
                      Contact Samir Directly &rarr;
                    </Link>
                    <button
                      type="button"
                      onClick={() => clearError()}
                      className="text-xs text-text-muted hover:text-foreground ml-auto px-2 py-1 transition-colors cursor-pointer"
                      title="Dismiss notice"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
          <div ref={messagesEndRef} />
        </div>

        {/* ── INPUT FORM AREA ─────────────────────────────────────────────────── */}
        <div className="p-3.5 sm:p-4 border-t border-border-primary bg-background dark:bg-card-bg space-y-2">
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 bg-background dark:bg-card-bg border border-border-primary rounded-xl p-1.5 pl-3.5 transition-colors ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'focus-within:border-foreground/50 dark:focus-within:border-accent-lime'
            }`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={isLoading ? "Synthesizing answer..." : "Ask about stack, architecture, or sprints..."}
              aria-label="Ask Samir's AI Assistant"
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm placeholder:text-text-muted/60 text-foreground py-1 disabled:cursor-not-allowed font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="p-2 rounded-lg bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all cursor-pointer font-bold shrink-0 focus-visible:ring-1 focus-visible:ring-accent-lime focus-visible:outline-none"
            >
              <FiSend className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center justify-between px-1 text-[10px] text-text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>Grounded in pgvector data</span>
            </span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </>
  );
}
