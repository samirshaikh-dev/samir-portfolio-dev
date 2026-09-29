import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Vercel Web Analytics + Speed Insights must never be intercepted by a
 * caching strategy, and this rule must precede `defaultCache` because
 * Serwist matches the first route that fits.
 *
 * Without it, `defaultCache` breaks the analytics pipeline two ways:
 *   1. `/_vercel/insights/script.js` matches the generic `/\.(?:js)$/i`
 *      StaleWhileRevalidate rule and is served from `static-js-assets` for
 *      24h, so a script update — and the observability config string it
 *      carries — can be withheld for a day.
 *   2. `/_vercel/insights/event` is a POST beacon. The
 *      `sameOrigin && !pathname.startsWith("/api/")` rule carries no `method`
 *      filter, so it claims the beacon and runs it through `NetworkFirst`.
 *      A network timeout with no cache hit drops the event silently.
 *
 * `NetworkOnly` passes every method straight through, so the script, the
 * view beacon, and the event beacon all reach Vercel intact.
 */
const vercelInsightsPassthrough: RuntimeCaching = {
  matcher: ({ sameOrigin, url: { pathname } }) =>
    sameOrigin && pathname.startsWith("/_vercel/insights/"),
  handler: new NetworkOnly(),
};

const runtimeCaching: RuntimeCaching[] = [
  vercelInsightsPassthrough,
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
});

serwist.addEventListeners();

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new update!",
    icon: "/Filled_Logo.png",
    badge: "/Filled_Logo.png",
    image: data.image || undefined,
    data: data.url || "/",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data || "/";

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});
