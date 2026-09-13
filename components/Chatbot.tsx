"use client";

import { useChat, UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRef, useEffect, useState } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { FiMessageSquare, FiSend, FiLoader, FiX, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

interface FriendlyError {
  title: string;
  description: string;
}

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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorId, setVisitorId] = useState<string>('');

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };
    loadFingerprint();
  }, []);

  const { messages, sendMessage, status, error, clearError } = useChat();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Wait for the slide-in animation to finish
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input }, { headers: visitorId ? { 'x-visitor-id': visitorId } : {} });
    setInput('');
  };

  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom only when a new message arrives or error occurs
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, error]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        aria-label="Open AI Chat"
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/*outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas Sidebar */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] bg-background border-l border-white/10 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
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
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask about my work</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-muted-foreground opacity-70">
              <FiMessageSquare className="w-10 h-10 mb-2" />
              <p className="text-sm px-4">
                Hi! I&apos;m an AI trained on Samir&apos;s portfolio. <br /> Ask me anything!
              </p>
            </div>
          )}

          {messages.map((m: UIMessage) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user'
                  ? 'bg-primary/10 border border-primary/20 text-foreground rounded-br-sm'
                  : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground rounded-bl-sm'
                  }`}
              >
                {m.parts?.map((part, i) => {
                  if (part.type === 'text') {
                    return (
                      <div key={i} className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:p-3 prose-pre:rounded-lg prose-p:text-inherit prose-headings:text-inherit prose-strong:text-inherit prose-a:text-primary">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  }
                  if (part.type === 'reasoning') {
                    return (
                      <div key={i} className="italic opacity-70 border-l-2 pl-2 mb-2 text-xs text-muted-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground rounded-bl-sm flex items-center gap-2">
                <FiLoader className="w-4 h-4 animate-spin" />
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
            className={`flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full p-1 pl-4 transition-all ${isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'focus-within:ring-1 focus-within:ring-primary focus-within:border-primary'
              }`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={isLoading ? "AI is typing..." : "Ask anything..."}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50 py-2 disabled:cursor-not-allowed disabled:bg-transparent text-foreground"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
