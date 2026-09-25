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
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 group ${
          isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Open AI Chat (Ctrl+K)"
        title="Open AI Chat (Ctrl+K)"
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/* Outside click backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas Drawer */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-background border-l border-white/10 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/Logo.svg"
                alt="Logo"
                fill
                className="rounded-full object-cover dark:invert transition-all duration-300"
                sizes="32px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">AI Assistant</h3>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/5 dark:bg-white/10 text-muted-foreground border border-black/5 dark:border-white/10">
                  Ctrl+K
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Ask about Samir&apos;s work</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearChat}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              title="Close chat (Esc)"
              aria-label="Close chat"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground px-4 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FiMessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Hi! I&apos;m Samir&apos;s AI Assistant.
                </p>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Trained on his projects, engineering experience, services, and background. Ask me anything!
                </p>
              </div>

              <div className="w-full pt-2 space-y-2 text-left">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70 text-center">
                  Try asking
                </p>
                <div className="flex flex-col gap-1.5 w-full">
                  {STARTERS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendWithHeaders(s.question)}
                      className="text-xs px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-primary/40 text-foreground transition-all duration-200 cursor-pointer text-left flex items-center justify-between group active:scale-[0.99]"
                    >
                      <span>{s.label}</span>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors text-xs">
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
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="relative group max-w-[88%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary/10 border border-primary/20 text-foreground rounded-br-sm'
                        : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground rounded-bl-sm'
                    }`}
                  >
                    {m.parts?.map((part, i) => {
                      if (part.type === 'text') {
                        return (
                          <div
                            key={i}
                            className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:p-3 prose-pre:rounded-lg prose-p:text-inherit prose-headings:text-inherit prose-strong:text-inherit prose-a:text-primary"
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
                                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                        {...props}
                                      >
                                        <span>{children}</span>
                                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-primary/10 border border-primary/20 no-underline inline-flex items-center gap-0.5">
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
                                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                        {...props}
                                      >
                                        <span>{children}</span>
                                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-primary/10 border border-primary/20 no-underline inline-flex items-center gap-0.5">
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
                                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                        {...props}
                                      >
                                        <span>{children}</span>
                                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-primary/10 border border-primary/20 no-underline inline-flex items-center gap-0.5">
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
                                        className="text-primary hover:underline inline-flex items-center gap-0.5"
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
                                      className="text-primary hover:underline inline-flex items-center gap-0.5"
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
                            className="italic opacity-70 border-l-2 pl-2 mb-2 text-xs text-muted-foreground"
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
                            className="my-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-foreground text-xs space-y-1"
                          >
                            <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                              <FiCheck className="w-4 h-4" />
                              <span>Inquiry Transmitted to Samir</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              Your message has been safely delivered to Samir&apos;s direct inbox. He will reply shortly!
                            </p>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {/* Copy response action */}
                  {m.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(m.id, getAssistantText(m))}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/80 backdrop-blur-xs border border-black/10 dark:border-white/10 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 cursor-pointer shadow-xs"
                      title="Copy response"
                      aria-label="Copy response"
                    >
                      {copiedId === m.id ? (
                        <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FiCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Grounding Citations Accordion */}
                {m.role === 'assistant' && sources.length > 0 && (
                  <details className="mt-1.5 text-[11px] text-muted-foreground group/sources max-w-[88%] pl-1">
                    <summary className="cursor-pointer select-none inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Grounded in {sources.length} {sources.length === 1 ? 'source' : 'sources'}</span>
                      <span className="opacity-60 text-[9px] font-mono group-open/sources:rotate-180 transition-transform">
                        &darr;
                      </span>
                    </summary>
                    <div className="mt-1.5 flex flex-wrap gap-1 pl-3 border-l-2 border-emerald-500/30 py-0.5">
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
                            className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-primary/40 text-foreground transition-colors inline-flex items-center gap-1 text-[11px]"
                          >
                            <span className="capitalize text-[10px] font-semibold text-muted-foreground">
                              {src.type}:
                            </span>
                            <span>{src.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                )}

                {/* Contextual Follow-up Chips */}
                {isLastMessage && m.role === 'assistant' && !isLoading && followUps.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 max-w-[90%] pl-1">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                      Suggested Follow-ups
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {followUps.map((fu, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendWithHeaders(fu.question)}
                          className="text-xs px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-primary/40 text-foreground transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary active:scale-95"
                        >
                          {fu.label} &rarr;
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground rounded-bl-sm flex items-center gap-2">
                <FiLoader className="w-4 h-4 animate-spin text-primary" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          {error && (() => {
            const { title, description } = getFriendlyErrorMessage(error);
            return (
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl p-4 text-sm bg-red-500/10 border border-red-500/20 text-foreground rounded-bl-sm space-y-3 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <FiAlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-xs tracking-wide uppercase text-red-600 dark:text-red-400">
                        {title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-colors"
                    >
                      Contact Samir &rarr;
                    </Link>
                    <button
                      type="button"
                      onClick={() => clearError()}
                      className="text-xs text-muted-foreground hover:text-foreground ml-auto px-1.5 py-1 transition-colors cursor-pointer"
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
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-background/50 pb-8 lg:pb-4">
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full p-1 pl-4 transition-all ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'focus-within:ring-1 focus-within:ring-primary focus-within:border-primary'
            }`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={isLoading ? "AI is thinking..." : "Ask anything..."}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 py-2 disabled:cursor-not-allowed disabled:bg-transparent text-foreground"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary/90 cursor-pointer"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
