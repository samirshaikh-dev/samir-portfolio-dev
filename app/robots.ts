import { MetadataRoute } from 'next';
import { APP_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/feed', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin/', '/api/', '/login/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/api/feed'],
        disallow: ['/admin/', '/api/', '/login/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
