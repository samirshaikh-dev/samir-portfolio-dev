// --- Constants ---
const WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const aiLimit = Number.isFinite(parseInt(process.env.AI_LIMIT || '', 10))
  ? parseInt(process.env.AI_LIMIT!, 10)
  : 5;

const isSecurityEnabled = process.env.AI_SECURITY === 'true';

// Maximum characters allowed per individual user turn
export const MAX_USER_MESSAGE_LENGTH = 800;

// Maximum turns in history allowed per request to prevent token exhaustion DoS
export const MAX_HISTORY_MESSAGES = 40;

// --- In-memory rate limiter ---
// NOTE: This does NOT persist across serverless cold starts or multiple Vercel
// function instances. Good enough for casual abuse prevention.
interface RateLimitInfo {
  count: number;
  resetAt: number;
}
const rateLimits = new Map<string, RateLimitInfo>();

// Periodic cleanup to prevent unbounded growth from unique visitors
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // hourly
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, info] of rateLimits) {
      if (now > info.resetAt) rateLimits.delete(key);
    }
  }, CLEANUP_INTERVAL_MS);
}

const checkRateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const info = rateLimits.get(key);
  if (!info || now > info.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (info.count >= limit) {
    return false;
  }
  info.count += 1;
  return true;
};

// --- Response helpers ---
export const staticChatResponse = (message: string, status: 200 | 400 | 403 | 429 = 429) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Fast adversarial prompt injection heuristics to guard API spend
const INJECTION_PATTERNS = [
  /\bignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions\b/i,
  /\breveal\s+(?:your\s+)?(?:system\s+prompt|initial\s+prompt|instructions)\b/i,
  /\bDAN\s+mode\b/i,
  /\bdeveloper\s+mode\s+(?:enabled|override)\b/i,
  /\boutput\s+all\s+system\s+directives\b/i,
  /\bpretend\s+you\s+have\s+no\s+rules\b/i,
];

/**
 * Validate incoming chat message payload for size bounds and blatant prompt injection.
 */
export function validateIncomingMessages(messages: unknown): { errorResponse: Response | null } {
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      errorResponse: staticChatResponse('Invalid or empty chat messages payload.', 400),
    };
  }

  if (messages.length > MAX_HISTORY_MESSAGES) {
    return {
      errorResponse: staticChatResponse('Conversation history is too long. Please refresh the chat to start a new session.', 400),
    };
  }

  const latest = messages[messages.length - 1];
  let text = '';
  if (typeof latest?.content === 'string') {
    text = latest.content;
  } else if (Array.isArray(latest?.parts)) {
    text = latest.parts.map((p: { text?: string }) => p?.text || '').join('');
  }

  if (text.length > MAX_USER_MESSAGE_LENGTH) {
    return {
      errorResponse: staticChatResponse(
        `Question exceeds the ${MAX_USER_MESSAGE_LENGTH}-character limit. Please shorten your inquiry to continue.`,
        400
      ),
    };
  }

  if (INJECTION_PATTERNS.some((p) => p.test(text))) {
    return {
      errorResponse: staticChatResponse(
        "Nice try! I'm strictly programmed to represent Samir Shaikh's engineering work, production systems, and client services. How can I help you explore his technical architecture or project portfolio?",
        200
      ),
    };
  }

  return { errorResponse: null };
}

// --- Main security pipeline ---
export async function runSecurityChecks(req: Request) {
  // NOTE: On Vercel, x-forwarded-for is set by edge proxy — leftmost value is client IP
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  const visitorId = req.headers.get('x-visitor-id');

  if (!visitorId) {
    return {
      errorResponse: new Response(
        JSON.stringify({ error: 'Missing visitor ID. Please enable JavaScript or refresh.' }),
        { status: 400 }
      ),
    };
  }

  // --- 1. VPN / Proxy check (fail open) ---
  if (isSecurityEnabled && ip && ip !== '127.0.0.1' && ip !== '::1') {
    try {
      const ipinfoRes = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API}`, {
        signal: AbortSignal.timeout(2000),
      });
      if (ipinfoRes.ok) {
        const ipData = await ipinfoRes.json();
        if (ipData.privacy && (ipData.privacy.vpn || ipData.privacy.proxy || ipData.privacy.tor || ipData.privacy.hosting)) {
          return {
            errorResponse: staticChatResponse(
              "Hey there! I noticed you're using a VPN or Proxy. To prevent abuse, I'm only allowed to chat with direct connections. Please disable it to continue chatting!",
              403
            ),
          };
        }
      }
    } catch (e) {
      // Fail open — IPinfo error skips VPN check rather than blocking legitimate visitors
      console.error("IPinfo fetch error:", e);
    }
  }

  // --- 2. Rate limiting (in-memory, per IP + per visitor) ---
  if (isSecurityEnabled) {
    const ipKey = `chat_ip:${ip}`;
    const visitorKey = `chat_visitor:${visitorId}`;

    if (!checkRateLimit(ipKey, aiLimit, WINDOW_MS)) {
      return {
        errorResponse: staticChatResponse(
          `Whoa, slow down there! You've reached your limit of ${aiLimit} questions for today. I'm taking a little nap. Come back tomorrow and we can chat some more!`
        ),
      };
    }

    if (!checkRateLimit(visitorKey, aiLimit, WINDOW_MS)) {
      return {
        errorResponse: staticChatResponse(
          `Whoa, slow down there! You've reached your limit of ${aiLimit} questions for today. I'm taking a little nap. Come back tomorrow and we can chat some more!`
        ),
      };
    }
  }

  return { errorResponse: null };
}
