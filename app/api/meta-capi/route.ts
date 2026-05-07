import { NextRequest, NextResponse } from 'next/server';
import { sendMetaCapiEvent, generateEventId } from '@/lib/meta-capi';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventId, fbp, fbc, eventSourceUrl, customData } = body;

    if (!eventName) {
      return NextResponse.json(
        { ok: false, error: 'eventName required' },
        { status: 400 }
      );
    }

    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '';
    const userAgent = request.headers.get('user-agent') || '';

    const finalEventId = eventId || generateEventId();

    const result = await sendMetaCapiEvent({
      eventName,
      eventId: finalEventId,
      userData: {
        fbp,
        fbc,
        clientIp,
        userAgent,
        eventSourceUrl,
      },
      customData: customData || {},
    });

    return NextResponse.json({ ok: result.success, eventId: finalEventId });
  } catch (error) {
    console.error('[Meta CAPI API] xatolik:', error);
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
