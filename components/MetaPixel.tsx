'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Cookie helper
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

// Event ID generator
export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Pixel event yuborish (deduplication ID bilan)
export function trackPixelEvent(
  eventName: string,
  params: Record<string, any> = {},
  eventId?: string
) {
  const id = eventId || generateEventId();
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params, { eventID: id });
  }
  return id;
}

// CAPI'ga ham yuborish (server-side)
export async function trackCapiEvent(
  eventName: string,
  eventId: string,
  customData: Record<string, any> = {}
) {
  try {
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        fbp,
        fbc,
        eventSourceUrl: window.location.href,
        customData,
      }),
    });
  } catch (err) {
    console.error('CAPI track error:', err);
  }
}

// Ikkalasini birga yuborish (Pixel + CAPI = ideal deduplication)
export async function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  const eventId = generateEventId();
  trackPixelEvent(eventName, params, eventId);
  await trackCapiEvent(eventName, eventId, params);
  return eventId;
}

export default function MetaPixel() {
  useEffect(() => {
    // PageView eventini Pixel + CAPI orqali yuborish
    if (PIXEL_ID && PIXEL_ID !== 'YOUR_PIXEL_ID_HERE') {
      const eventId = generateEventId();
      // Biroz kutamiz fbq yuklanguncha
      const timer = setTimeout(() => {
        if (window.fbq) {
          window.fbq('track', 'PageView', {}, { eventID: eventId });
          trackCapiEvent('PageView', eventId);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!PIXEL_ID || PIXEL_ID === 'YOUR_PIXEL_ID_HERE') {
    return null;
  }

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
