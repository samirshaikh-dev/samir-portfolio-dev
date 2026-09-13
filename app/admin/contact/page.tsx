"use client";

import { useState, useEffect } from "react";
import {
  FiEye,
  FiMail,
  FiCheck,
  FiX,
  FiCornerUpLeft,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  seen: boolean;
  createdAt?: string | Date;
  created_at?: string | Date;
}

function getInitials(name: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatMessageDate(dateVal?: string | Date): string {
  if (!dateVal) return "Just now";
  try {
    const d = new Date(dateVal);
    return d.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return String(dateVal);
  }
}

export default function ContactAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);
  const [replyingTo, setReplyingTo] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    async function loadMessages() {
      try {
        const res = await fetch("/api/contact");
        if (res.ok) {
          const data = await res.json();
          if (isSubscribed) {
            setMessages(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    void loadMessages();

    return () => {
      isSubscribed = false;
    };
  }, []);

  async function toggleSeen(id: string, currentSeen: boolean) {
    try {
      // Optimistic update
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, seen: !currentSeen } : msg))
      );

      if (viewingMessage && viewingMessage.id === id) {
        setViewingMessage((prev) => (prev ? { ...prev, seen: !currentSeen } : null));
      }

      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seen: !currentSeen }),
      });

      if (!res.ok) {
        // Revert on error
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, seen: currentSeen } : msg))
        );
        if (viewingMessage && viewingMessage.id === id) {
          setViewingMessage((prev) => (prev ? { ...prev, seen: currentSeen } : null));
        }
      }
    } catch (error) {
      console.error("Failed to toggle seen status:", error);
    }
  }

  async function markAllSeen() {
    try {
      setMessages((prev) => prev.map((msg) => ({ ...msg, seen: true })));
      if (viewingMessage) {
        setViewingMessage((prev) => (prev ? { ...prev, seen: true } : null));
      }
      await fetch("/api/contact/seen-all", { method: "POST" });
    } catch (error) {
      console.error("Failed to mark all as seen:", error);
    }
  }

  function handleOpenView(msg: ContactMessage) {
    setViewingMessage(msg);
    // Mark as seen automatically when viewed if currently unread
    if (!msg.seen) {
      toggleSeen(msg.id, false);
    }
  }

  function handleStartReply(msg: ContactMessage) {
    setReplyingTo(msg);
    setReplyText("");
  }

  async function sendReply() {
    if (!replyingTo || !replyText.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch(`/api/contact/${replyingTo.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyText }),
      });

      if (res.ok) {
        alert("Reply sent successfully!");
        setReplyingTo(null);
        setReplyText("");
        // Mark as seen in state
        setMessages((prev) =>
          prev.map((msg) => (msg.id === replyingTo.id ? { ...msg, seen: true } : msg))
        );
        if (viewingMessage && viewingMessage.id === replyingTo.id) {
          setViewingMessage((prev) => (prev ? { ...prev, seen: true } : null));
        }
      } else {
        const data = await res.json().catch(() => ({}));
        alert(`Failed to send reply: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
      alert("Failed to send reply. Please check console.");
    } finally {
      setSendingReply(false);
    }
  }

  const unreadCount = messages.filter((m) => !m.seen).length;

  if (loading) {
    return <div className="p-10 text-text-muted">Loading messages...</div>;
  }

  return (
    <main className="flex flex-1">
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Contact Messages
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {unreadCount} unread
              </span>
            )}
          </div>
          {messages.length > 0 && (
            <button
              onClick={markAllSeen}
              className="inline-flex items-center gap-2 rounded-lg bg-hover-bg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-border-primary hover:text-foreground transition-colors self-start sm:self-auto"
            >
              <FiCheckCircle className="w-4 h-4 text-text-muted" />
              <span>Mark all as seen</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {messages.length === 0 ? (
          <div className="rounded-xl border border-border-primary bg-background p-10 text-center text-text-muted text-sm">
            No contact messages received yet.
          </div>
        ) : (
          /* Table-style compact single-line messages container */
          <div className="rounded-xl border border-border-primary bg-background overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <div className="min-w-[860px] divide-y divide-border-primary">
                {messages.map((msg) => {
                  const isUnread = !msg.seen;

                  return (
                    <div
                      key={msg.id}
                      onClick={() => handleOpenView(msg)}
                      className={`group flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer ${
                        isUnread
                          ? "bg-footer-bg hover:bg-hover-bg/70"
                          : "bg-background hover:bg-hover-bg/50"
                      }`}
                    >
                      {/* Unread Status Dot */}
                      <div className="w-2 flex items-center justify-center shrink-0">
                        {isUnread ? (
                          <span
                            className="w-2 h-2 rounded-full bg-blue-500 shadow-xs"
                            title="Unread message"
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-transparent" />
                        )}
                      </div>

                      {/* Sender Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 select-none ${
                          isUnread
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 ring-1 ring-blue-500/30"
                            : "bg-hover-bg text-text-muted border border-border-primary"
                        }`}
                      >
                        {getInitials(msg.name)}
                      </div>

                      {/* Sender Name */}
                      <span
                        className={`w-36 truncate shrink-0 text-foreground ${
                          isUnread ? "font-semibold" : "font-medium"
                        }`}
                        title={msg.name}
                      >
                        {msg.name}
                      </span>

                      {/* Separator */}
                      <span className="text-border-primary select-none shrink-0">|</span>

                      {/* Sender Email */}
                      <a
                        href={`mailto:${msg.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-44 truncate shrink-0 text-xs text-text-muted hover:text-foreground hover:underline"
                        title={msg.email}
                      >
                        {msg.email}
                      </a>

                      {/* Separator */}
                      <span className="text-border-primary select-none shrink-0">|</span>

                      {/* Subject */}
                      <div
                        className="w-52 truncate shrink-0 text-xs text-foreground"
                        title={msg.subject}
                      >
                        <span className="text-text-muted font-normal">Subject: </span>
                        <span className={isUnread ? "font-semibold" : "font-medium"}>
                          {msg.subject}
                        </span>
                      </div>

                      {/* Separator */}
                      <span className="text-border-primary select-none shrink-0">|</span>

                      {/* Truncated Short Message Preview */}
                      <span
                        className="flex-1 min-w-[140px] truncate text-xs text-text-muted group-hover:text-text-secondary transition-colors"
                        title={msg.message}
                      >
                        {msg.message}
                      </span>

                      {/* Separator */}
                      <span className="text-border-primary select-none shrink-0">|</span>

                      {/* Date & Time */}
                      <span className="w-36 truncate text-right text-xs text-text-muted whitespace-nowrap shrink-0">
                        {formatMessageDate(msg.createdAt || msg.created_at)}
                      </span>

                      {/* Actions */}
                      <div
                        className="flex items-center gap-1.5 shrink-0 ml-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Toggle Read/Unread Icon Button */}
                        <button
                          type="button"
                          onClick={() => toggleSeen(msg.id, msg.seen)}
                          className={`p-1.5 rounded-md transition-colors ${
                            isUnread
                              ? "text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              : "text-text-muted hover:text-text-secondary hover:bg-hover-bg"
                          }`}
                          title={msg.seen ? "Mark as unread" : "Mark as seen"}
                          aria-label={msg.seen ? "Mark message as unread" : "Mark message as seen"}
                        >
                          <FiMail className="w-4 h-4" />
                        </button>

                        {/* View Button with Eye Icon */}
                        <button
                          type="button"
                          onClick={() => handleOpenView(msg)}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-hover-bg text-text-secondary hover:text-foreground hover:bg-border-primary transition-colors"
                          title="View message"
                          aria-label={`View message from ${msg.name}`}
                        >
                          <FiEye className="w-3.5 h-3.5 text-text-muted" />
                          <span>View</span>
                        </button>

                        {/* Reply Button */}
                        <button
                          type="button"
                          onClick={() => handleStartReply(msg)}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors"
                          title="Reply to message"
                          aria-label={`Reply to message from ${msg.name}`}
                        >
                          <FiCornerUpLeft className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Message Detail Modal */}
      {viewingMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setViewingMessage(null)}
        >
          <div
            className="bg-background border border-border-primary rounded-2xl p-6 w-full max-w-2xl shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm shrink-0">
                  {getInitials(viewingMessage.name)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                    {viewingMessage.name}
                    {viewingMessage.seen ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-hover-bg text-text-muted">
                        <FiCheck className="w-3 h-3" /> Seen
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        New
                      </span>
                    )}
                  </h2>
                  <a
                    href={`mailto:${viewingMessage.email}`}
                    className="text-xs text-text-muted hover:text-foreground hover:underline"
                  >
                    {viewingMessage.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingMessage(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors"
                title="Close"
                aria-label="Close dialog"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
              {/* Subject & Date Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-footer-bg border border-border-primary">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium block">
                    Subject
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {viewingMessage.subject}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted shrink-0 self-start sm:self-auto">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>
                    {formatMessageDate(
                      viewingMessage.createdAt || viewingMessage.created_at
                    )}
                  </span>
                </div>
              </div>

              {/* Full Message Body */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                  Message Content
                </span>
                <div className="p-4 rounded-xl bg-footer-bg/60 border border-border-primary text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-[40vh] overflow-y-auto">
                  {viewingMessage.message}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border-primary">
              <button
                type="button"
                onClick={() => toggleSeen(viewingMessage.id, viewingMessage.seen)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors border border-border-primary"
              >
                <FiMail className="w-3.5 h-3.5" />
                <span>
                  {viewingMessage.seen ? "Mark as unread" : "Mark as read"}
                </span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setViewingMessage(null)}
                  className="px-4 py-2 text-xs font-medium text-text-muted hover:bg-hover-bg rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = viewingMessage;
                    setViewingMessage(null);
                    handleStartReply(target);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs"
                >
                  <FiCornerUpLeft className="w-3.5 h-3.5" />
                  <span>Reply to sender</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyingTo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setReplyingTo(null)}
        >
          <div
            className="bg-background border border-border-primary rounded-2xl p-6 w-full max-w-2xl shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Reply to {replyingTo.name}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Re: {replyingTo.subject} • Sending to{" "}
                  <span className="font-mono text-foreground">{replyingTo.email}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors"
                title="Cancel"
                aria-label="Close reply modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <textarea
              className="w-full rounded-xl border border-border-primary bg-background p-3 text-sm text-foreground focus:border-foreground outline-none resize-y min-h-[180px] transition-colors"
              placeholder="Write your email reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={sendingReply}
              autoFocus
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                disabled={sendingReply}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:bg-hover-bg rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendReply}
                disabled={sendingReply || !replyText.trim()}
                className="px-4 py-2 text-sm font-medium text-background bg-foreground hover:opacity-90 rounded-lg transition-colors disabled:opacity-50 shadow-xs"
              >
                {sendingReply ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
