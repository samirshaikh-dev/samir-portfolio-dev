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
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import type { GroundingSource } from '@/lib/chat/retrieval';

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
  { label: 'Featured Projects', question: "What are Samir's most complex full-stack and AI projects?" },
  { label: 'Engineering Services', question: 'What engineering and freelance services does Samir offer?' },
  { label: 'Work Experience', question: 'Where has Samir worked and what were his key roles?' },
  { label: 'How to Contact', question: 'What is the best way to contact Samir directly?' },
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

  // Preserve friendly conversational notices from security checks (e.g., VPN, daily limits)
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

  // API Key / Authentication / Provider configuration errors
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

  // Rate limits or quotas
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

  // Network / connection drop
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

  // Generic fallback
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const isLoading = status === 'submitted' || status === 'streaming';

  const sendWithHeaders = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean || isLoading) return;
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

  // Auto-scroll when messages, status, error, sources, or follow-ups change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, status, error, lastFollowUps.length, lastSources.length]);

  return (
    <>
      {/* Floating Action Button — High Impact Electric Lime CTA Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-accent-lime text-[#0A0A0A] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-[0_0_24px_rgba(184,255,0,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all border border-black/10 dark:border-accent-lime/40 cursor-pointer group focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none ${
          isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Open AI Assistant (Ctrl+K)"
        title="Open AI Assistant (Ctrl+K)"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0A0A] opacity-35" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0A0A0A]" />
        </span>
        <span className="hidden sm:inline font-black tracking-tight uppercase text-xs">Ask AI</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/10 text-[#0A0A0A] border border-black/10">
          Ctrl+K
        </kbd>
        <FiMessageSquare className="w-4 h-4 stroke-[2.4]" />
      </button>

      {/* Outside click backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas Drawer Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatbot-dialog-title"
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[440px] bg-background dark:bg-card-bg border-l border-border-primary z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Background ambient corner glow matching LinkedIn Banner aesthetics */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-2xl pointer-events-none -z-10"
        />
        {/* Subtle geometric dot matrix texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.025] dark:opacity-[0.05] pointer-events-none -z-10"
        />

        {/* Screen Reader Live Region for status & accessibility announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isLoading ? "AI assistant is generating response..." : ""}
          {lastMessage?.role === 'assistant' && !isLoading ? "AI assistant completed response." : ""}
          {error ? `Notice: ${getFriendlyErrorMessage(error).title}` : ""}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border-primary bg-background/90 dark:bg-card-bg/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-border-primary bg-background dark:bg-card-bg p-1 shadow-2xs">
              <Image
                src="/Logo.svg"
                alt="Samir Shaikh Logo"
                fill
                className="rounded-lg object-contain dark:invert transition-all duration-300"
                sizes="36px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="chatbot-dialog-title" className="font-bold text-sm text-foreground tracking-tight">
                  Samir&apos;s AI Assistant
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-hover-bg text-text-muted border border-border-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                  RAG Active
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Trained on projects, experience &amp; systems
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 rounded-full text-text-muted hover:text-foreground hover:bg-hover-bg border border-transparent hover:border-border-primary transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-text-muted hover:text-foreground hover:bg-hover-bg border border-transparent hover:border-border-primary transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
              title="Close chat (Esc)"
              aria-label="Close chat (Esc)"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          role="log"
          aria-label="Conversation history"
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-5 px-3 my-auto">
              <div className="w-14 h-14 rounded-2xl bg-card-bg border border-border-primary flex items-center justify-center text-foreground shadow-2xs relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
                />
                <FiMessageSquare className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-foreground tracking-tight">
                  Hi! I&apos;m Samir&apos;s AI Assistant
                </h3>
                <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
                  Trained on his production projects, system architecture, engineering roles, and services. Ask me anything!
                </p>
              </div>

              <div className="w-full pt-3 space-y-2 text-left">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="h-px w-8 bg-border-primary" />
                  <p className="text-[10px] uppercase tracking-wider font-mono font-semibold text-text-muted">
                    Suggested Prompts
                  </p>
                  <span className="h-px w-8 bg-border-primary" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  {STARTERS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendWithHeaders(s.question)}
                      className="text-xs px-4 py-3 rounded-xl bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/30 dark:hover:border-accent-lime/40 hover:bg-hover-bg text-foreground transition-all duration-200 cursor-pointer text-left flex items-center justify-between group shadow-2xs hover:shadow-xs active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
                    >
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="text-text-muted group-hover:text-foreground dark:group-hover:text-accent-lime transition-colors text-xs font-mono">
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
                    <div className="relative group max-w-[85%] rounded-2xl rounded-tr-xs px-4 py-3 text-sm leading-relaxed bg-hover-bg border border-border-secondary text-foreground shadow-2xs">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                      Samir Shaikh AI
                    </div>
                    <div className="relative group max-w-[90%] rounded-2xl rounded-tl-xs px-4 py-3.5 text-sm leading-relaxed bg-background dark:bg-card-bg border border-border-primary text-foreground shadow-2xs">
                      {m.parts?.map((part, i) => {
                        if (part.type === 'text') {
                          return (
                            <div
                              key={i}
                              className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-p:leading-relaxed prose-p:text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-pre:bg-hover-bg prose-pre:border prose-pre:border-border-primary prose-pre:p-3 prose-pre:rounded-xl prose-code:font-mono prose-code:text-xs"
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
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-all"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
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
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-all"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
                                            Service <FiArrowUpRight className="w-2.5 h-2.5" />
                                          </span>
                                        </Link>
                                      );
                                    }
                                    if (href && href.startsWith('/technical-skills')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime transition-all"
                                          {...props}
                                        >
                                          <span>{children}</span>
                                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-hover-bg border border-border-primary text-foreground no-underline inline-flex items-center gap-0.5">
                                            Tech Skills <FiArrowUpRight className="w-2.5 h-2.5" />
                                          </span>
                                        </Link>
                                      );
                                    }
                                    if (href && href.startsWith('/')) {
                                      return (
                                        <Link
                                          href={href}
                                          onClick={() => setIsOpen(false)}
                                          className="font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime dark:hover:decoration-accent-lime inline-flex items-center gap-0.5 transition-colors"
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
                                        className="font-semibold text-foreground underline decoration-border-primary hover:decoration-accent-lime dark:hover:decoration-accent-lime inline-flex items-center gap-0.5 transition-colors"
                                        {...props}
                                      >
                                        <span>{children}</span>
                                        <FiExternalLink className="w-2.5 h-2.5 inline-block opacity-70" />
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
                              className="italic border-l-2 border-border-primary pl-3 my-2 text-xs text-text-muted bg-hover-bg/40 py-1.5 rounded-r-lg"
                            >
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {part.text}
                              </ReactMarkdown>
                            </div>
                          );
                        }

                        // In-chat Tool Execution UI (Agentic Contact Confirmation)
                        if ((part as { type?: string }).type?.startsWith('tool-') || (part as { type?: string }).type === 'tool-invocation') {
                          return (
                            <div
                              key={i}
                              className="my-2.5 p-3.5 rounded-xl bg-hover-bg border border-border-primary text-foreground text-xs space-y-1.5 shadow-2xs"
                            >
                              <div className="flex items-center gap-2 font-bold text-foreground">
                                <span className="p-1 rounded-full bg-accent-lime text-[#0A0A0A]">
                                  <FiCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                                </span>
                                <span>Inquiry Transmitted to Samir</span>
                              </div>
                              <p className="text-text-secondary leading-relaxed pl-6">
                                Your message has been safely delivered to Samir&apos;s direct inbox. He will reply shortly!
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
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-background/90 dark:bg-card-bg/90 backdrop-blur-xs border border-border-primary text-text-muted hover:text-foreground hover:bg-hover-bg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 cursor-pointer shadow-2xs focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
                        title="Copy response"
                        aria-label="Copy response"
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
                      <details className="mt-2 text-[11px] text-text-muted group/sources max-w-[90%] pl-1">
                        <summary className="cursor-pointer select-none inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)] shrink-0" />
                          <span>Grounded in {sources.length} {sources.length === 1 ? 'source' : 'sources'}</span>
                          <span className="opacity-60 text-[9px] font-mono group-open/sources:rotate-180 transition-transform">
                            &darr;
                          </span>
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-1.5 pl-3 border-l-2 border-border-primary py-0.5">
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
                                className="px-2.5 py-1 rounded-lg bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/30 dark:hover:border-accent-lime/40 hover:bg-hover-bg text-foreground transition-all inline-flex items-center gap-1.5 text-[11px] shadow-2xs"
                              >
                                <span className="capitalize text-[10px] font-mono font-semibold text-text-muted">
                                  {src.type}:
                                </span>
                                <span className="font-medium">{src.title}</span>
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
                          Suggested Follow-ups
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {followUps.map((fu, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => sendWithHeaders(fu.question)}
                              className="text-xs px-3.5 py-1.5 rounded-full bg-background dark:bg-card-bg border border-border-primary hover:border-foreground/30 dark:hover:border-accent-lime/40 hover:bg-hover-bg text-foreground transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime active:scale-95 shadow-2xs inline-flex items-center gap-1.5 group"
                            >
                              <span>{fu.label}</span>
                              <span className="text-text-muted group-hover:text-foreground dark:group-hover:text-accent-lime transition-colors text-xs font-mono">
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
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)] animate-pulse" />
                Samir Shaikh AI
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-xs px-4 py-3 text-sm bg-background dark:bg-card-bg border border-border-primary text-foreground flex items-center gap-2.5 shadow-2xs">
                <FiLoader className="w-4 h-4 animate-spin text-foreground dark:text-accent-lime" />
                <span className="text-text-secondary font-medium text-xs">Synthesizing answer...</span>
              </div>
            </div>
          )}

          {error && (() => {
            const { title, description } = getFriendlyErrorMessage(error);
            return (
              <div className="flex justify-start w-full">
                <div className="max-w-[92%] rounded-2xl rounded-tl-xs p-4 text-sm bg-red-500/10 border border-red-500/30 text-foreground space-y-3 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-xs tracking-wide uppercase font-mono text-red-600 dark:text-red-400">
                        {title}
                      </p>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-red-500/20">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-full bg-background dark:bg-card-bg border border-border-primary hover:bg-hover-bg text-foreground transition-all shadow-2xs"
                    >
                      Contact Samir &rarr;
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

        {/* Input Area */}
        <div className="p-4 border-t border-border-primary bg-background/90 dark:bg-card-bg/90 backdrop-blur-md pb-6 sm:pb-4 space-y-2">
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 bg-background dark:bg-card-bg border border-border-primary rounded-full p-1.5 pl-4 shadow-2xs transition-all ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'focus-within:border-foreground/40 dark:focus-within:border-accent-lime focus-within:shadow-[0_0_12px_rgba(184,255,0,0.25)]'
            }`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={isLoading ? "AI is thinking..." : "Ask about projects, stack, or experience..."}
              aria-label="Ask Samir's AI Assistant"
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-text-muted/60 text-foreground py-1 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-full bg-accent-lime text-[#0A0A0A] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(184,255,0,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold shrink-0 focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
            >
              <FiSend className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
          <div className="flex items-center justify-between px-2 text-[10px] text-text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_4px_rgba(184,255,0,0.8)]" />
              Grounded in Portfolio Data
            </span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </>
  );
}
