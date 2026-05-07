import { NextRequest, NextResponse } from 'next/server';
import { sendMetaCapiEvent, generateEventId } from '@/lib/meta-capi';

export const runtime = 'nodejs';

interface OrderRequest {
  name: string;
  surname?: string;
  age: string;
  region: string;
  phone: string;
  fbp?: string;
  fbc?: string;
  eventId?: string;
  eventSourceUrl?: string;
}

// Telefon validatsiyasi (faqat O'zbekiston raqamlari)
function validatePhone(phone: string): { ok: boolean; clean?: string; msg?: string } {
  const clean = phone.replace(/\D/g, '');
  const pattern = /^(90|91|93|94|95|97|98|99|33|88|77|50|55)\d{7}$/;
  if (clean.length !== 9) {
    return { ok: false, msg: "Telefon 9 raqam bo'lishi kerak" };
  }
  if (!pattern.test(clean)) {
    return { ok: false, msg: "Faqat O'zbekiston raqamlari" };
  }
  return { ok: true, clean };
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();
    const { name, surname, age, region, phone, fbp, fbc, eventId, eventSourceUrl } = body;

    // Validatsiya
    if (!name || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: "Ismingizni kiriting!" },
        { status: 400 }
      );
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      return NextResponse.json(
        { ok: false, error: "Yoshingiz 18-100 oralig'ida bo'lishi kerak!" },
        { status: 400 }
      );
    }

    if (!region) {
      return NextResponse.json(
        { ok: false, error: "Viloyatingizni tanlang!" },
        { status: 400 }
      );
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.ok) {
      return NextResponse.json(
        { ok: false, error: phoneCheck.msg },
        { status: 400 }
      );
    }

    // Client ma'lumotlari (CAPI uchun)
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '';
    const userAgent = request.headers.get('user-agent') || '';

    // Telegram bot
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    let telegramSuccess = false;

    if (BOT_TOKEN && CHAT_ID) {
      let msg = `🆕 YANGI BUYURTMA!\n━━━━━━━━━━━━━━━━━━━━━\n📦 Mahsulot: Champion Man\n👤 Ism: ${name}`;
      if (surname) msg += `\n👨 Familiya: ${surname}`;
      msg += `\n🎂 Yosh: ${age}\n📍 Viloyat: ${region}\n📞 Telefon: +998${phoneCheck.clean}\n🕐 Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
          }
        );
        const tgData = await tgRes.json();
        telegramSuccess = !!tgData.ok;
      } catch (err) {
        console.error('[Telegram] xatolik:', err);
      }
    }

    // Meta CAPI - Lead/Purchase event yuborish
    const finalEventId = eventId || generateEventId();
    const capiResult = await sendMetaCapiEvent({
      eventName: 'Lead', // Yoki 'Purchase' - sizning xohishingizga qarab
      eventId: finalEventId,
      userData: {
        name,
        surname,
        phone: phoneCheck.clean,
        age,
        region,
        fbp,
        fbc,
        clientIp,
        userAgent,
        eventSourceUrl,
      },
      customData: {
        content_name: 'Champion Man',
        content_category: 'Mens Health',
        content_type: 'product',
        value: 0, // narx kiritilsa qo'shing
      },
    });

    if (!telegramSuccess) {
      return NextResponse.json(
        { ok: false, error: "Buyurtma yuborishda xatolik. Qaytadan urining." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      eventId: finalEventId,
      capi: capiResult.success,
    });
  } catch (error) {
    console.error('[Order API] xatolik:', error);
    return NextResponse.json(
      { ok: false, error: "Server xatoligi" },
      { status: 500 }
    );
  }
}
