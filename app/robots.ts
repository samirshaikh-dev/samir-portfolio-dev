import { MetadataRoute } from 'next';
import { APP_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // General crawlers: allow all public content, block admin/private API
        userAgent: '*',
        allow: [
          '/',
          '/api/feed',
          '/llms.txt',
          '/llms-full.txt',
          '/privacy-policy',
          '/terms-of-service',
          '/.well-known/',
        ],
        disallow: ['/admin/', '/api/', '/login/'],
      },
      {
        // AI answer-engine crawlers: grant explicit access to LLM context files
        // and legal/trust pages to strengthen entity recognition
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'Anthropic-AI',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
          'YouBot',
          'DuckAssistBot',
          'Bytespider',
          'facebookexternalhit',
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/api/feed',
          '/privacy-policy',
          '/terms-of-service',
          '/.well-known/',
        ],
        disallow: ['/admin/', '/api/', '/login/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
