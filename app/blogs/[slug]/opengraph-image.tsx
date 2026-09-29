import { ImageResponse } from 'next/og';
import { db } from "@/lib/db";
import { blogs as blogsSchema } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export const runtime = 'nodejs';
export const alt = 'Blog post by Samir Shaikh';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let title = 'Blog | Samir Shaikh';
  let excerpt = 'Technical articles on backend engineering, AI, and system design.';

  try {
    const result = await db
      .select({ title: blogsSchema.title, excerpt: blogsSchema.excerpt })
      .from(blogsSchema)
      .where(and(eq(blogsSchema.slug, slug), eq(blogsSchema.isPublished, true)))
      .limit(1);

    if (result[0]) {
      title = result[0].title;
      excerpt = result[0].excerpt || excerpt;
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 60%, #161616 100%)',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Subtle Electric Lime glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 85% 15%, rgba(184,255,0,0.14) 0%, transparent 60%)',
          }}
        />

        {/* Top branding bar */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              fontSize: '12px',
              fontWeight: '600',
              color: '#F7F8F2',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '9999px',
                background: '#B8FF00',
              }}
            />
            Samir Shaikh • Technical Journal
          </div>
        </div>

        {/* Electric Lime Accent line */}
        <div
          style={{
            width: '56px',
            height: '4px',
            borderRadius: '2px',
            background: '#B8FF00',
            marginBottom: '24px',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#F7F8F2',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            maxWidth: '920px',
            marginBottom: '20px',
          }}
        >
          {title.length > 70 ? title.slice(0, 70) + '…' : title}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div
            style={{
              fontSize: '22px',
              color: '#A8ADA0',
              lineHeight: '1.5',
              maxWidth: '850px',
            }}
          >
            {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
          </div>
        )}

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '64px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.04em',
            fontFamily: 'monospace',
          }}
        >
          samir-portfolio-dev.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
