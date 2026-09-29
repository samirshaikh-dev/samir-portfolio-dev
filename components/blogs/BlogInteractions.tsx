'use client';

import { useState } from 'react';

interface Comment {
  name: string;
  comment: string;
  createdAt: string;
}

interface BlogInteractionsProps {
  slug: string;
  initialComments: Comment[];
}

export default function BlogInteractions({ slug, initialComments }: BlogInteractionsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/blogs/${slug}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment: commentText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setName('');
      setCommentText('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div id="comments" className="mt-16 pt-12 border-t border-border-primary">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            COMMUNITY
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Discussion ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="mb-12 bg-background dark:bg-card-bg p-6 sm:p-8 rounded-3xl border border-border-primary shadow-2xs"
        >
          <h4 className="text-base sm:text-lg font-bold text-foreground mb-4">
            Join the conversation
          </h4>

          {error && (
            <div
              role="alert"
              className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-500/30"
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="commenter-name" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Your Name
              </label>
              <input
                id="commenter-name"
                type="text"
                required
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-hover-bg border border-border-primary text-foreground placeholder-text-muted rounded-xl focus:bg-background focus:ring-2 focus:ring-accent-lime focus:border-accent-lime outline-none transition-all text-sm"
                placeholder="Ada Lovelace"
              />
            </div>

            <div>
              <label htmlFor="commenter-text" className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                Comment
              </label>
              <textarea
                id="commenter-text"
                required
                maxLength={1000}
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 bg-hover-bg border border-border-primary text-foreground placeholder-text-muted rounded-xl focus:bg-background focus:ring-2 focus:ring-accent-lime focus:border-accent-lime outline-none transition-all text-sm resize-y"
                placeholder="Share your thoughts, architectural critique, or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !commentText.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-6 py-3 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment →'}
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-footer-bg border border-border-primary">
              <p className="text-text-muted text-sm italic">
                No comments yet. Be the first to share your thoughts on this architecture!
              </p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                key={index}
                className="bg-background dark:bg-card-bg border border-border-primary rounded-2xl p-5 sm:p-6 shadow-2xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-hover-bg border border-border-primary flex items-center justify-center font-bold text-foreground text-xs font-mono">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground">{comment.name}</h5>
                    <span className="text-[11px] font-mono text-text-muted">{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed pl-11">
                  {comment.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
