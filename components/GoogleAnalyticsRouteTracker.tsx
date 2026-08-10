'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

// gtag.js is injected with strategy="afterInteractive", so window.gtag can still
// be undefined when this effect first runs. Because the layout sets
// send_page_view: false, a dropped send is a permanently lost page view rather
// than a delayed one, so keep polling until the stub exists.
const READY_POLL_MS = 250;
const READY_TIMEOUT_MS = 10_000;

export default function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const nextPath = pathname || '/';
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const deadline = Date.now() + READY_TIMEOUT_MS;

    const attempt = () => {
      if (cancelled) return;
      // Deferred by at least one task so App Router has committed the new
      // document.title before it is read into the page_view payload.
      if (trackPageView(nextPath)) return;
      if (Date.now() >= deadline) return;
      timer = setTimeout(attempt, READY_POLL_MS);
    };

    timer = setTimeout(attempt, 0);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
