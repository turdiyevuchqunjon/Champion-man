import crypto from 'crypto';

// SHA-256 hash funksiyasi (Meta CAPI talab qiladi)
export function hashData(data: string): string {
  if (!data) return '';
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
}

// Telefon raqamni normalizatsiya qilish (faqat raqamlar)
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

interface UserData {
  name?: string;
  surname?: string;
  phone?: string;
  age?: string;
  region?: string;
  fbp?: string; // Facebook Browser ID (cookie _fbp)
  fbc?: string; // Facebook Click ID (cookie _fbc)
  clientIp?: string;
  userAgent?: string;
  eventSourceUrl?: string;
}

interface CapiEventParams {
  eventName: string;
  eventId: string; // Pixel va CAPI deduplication uchun
  userData: UserData;
  customData?: Record<string, any>;
}

export async function sendMetaCapiEvent({
  eventName,
  eventId,
  userData,
  customData = {},
}: CapiEventParams) {
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

  if (!PIXEL_ID || !ACCESS_TOKEN || PIXEL_ID === 'YOUR_PIXEL_ID_HERE') {
    console.warn('[Meta CAPI] Pixel ID yoki Access Token sozlanmagan');
    return { success: false, error: 'CAPI not configured' };
  }

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  // User ma'lumotlarini hashlash (Meta talabi)
  const hashedUserData: Record<string, string | string[]> = {};

  if (userData.name) {
    hashedUserData.fn = hashData(userData.name);
  }
  if (userData.surname) {
    hashedUserData.ln = hashData(userData.surname);
  }
  if (userData.phone) {
    const normalizedPhone = '998' + normalizePhone(userData.phone);
    hashedUserData.ph = hashData(normalizedPhone);
  }
  if (userData.region) {
    hashedUserData.st = hashData(userData.region);
    hashedUserData.country = hashData('uz');
  }
  if (userData.fbp) {
    hashedUserData.fbp = userData.fbp;
  }
  if (userData.fbc) {
    hashedUserData.fbc = userData.fbc;
  }
  if (userData.clientIp) {
    hashedUserData.client_ip_address = userData.clientIp;
  }
  if (userData.userAgent) {
    hashedUserData.client_user_agent = userData.userAgent;
  }

  const eventData = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: userData.eventSourceUrl || process.env.NEXT_PUBLIC_SITE_URL,
        action_source: 'website',
        user_data: hashedUserData,
        custom_data: {
          currency: 'UZS',
          ...customData,
        },
      },
    ],
    ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI] Xatolik:', result);
      return { success: false, error: result };
    }

    return { success: true, result };
  } catch (error) {
    console.error('[Meta CAPI] Network xatolik:', error);
    return { success: false, error };
  }
}

// Unique event ID generator (deduplication uchun)
export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
