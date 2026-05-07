# 🏆 Champion Man - Next.js App Router

Champion Man landing page'i - Next.js 14 App Router, TypeScript, Telegram Bot, Meta Pixel + Conversions API integratsiyasi bilan.

## ✨ Imkoniyatlar

- ✅ **Original dizayn 100% saqlangan** - hech qanday vizual o'zgarish yo'q
- ✅ **Next.js 14 App Router** - server-side API routes
- ✅ **TypeScript** - to'liq type-safety
- ✅ **Telegram Bot integratsiyasi** - buyurtmalar avtomatik yuboriladi
- ✅ **Meta Pixel** - client-side tracking
- ✅ **Meta Conversions API (CAPI)** - server-side tracking
- ✅ **Event Deduplication** - Pixel + CAPI bir xil `eventID` ishlatadi (Meta talabi)
- ✅ **SHA-256 hashlash** - PII ma'lumotlar Meta talabicha hashlangan
- ✅ **AOS animatsiyalar** - aynan original kabi
- ✅ **Counter animatsiya** - statistika raqamlari
- ✅ **Validatsiya** - client + server tomonida
- ✅ **iOS 14+ uchun ATT moslashuv** - CAPI orqali

## 📁 Loyiha tuzilishi

```
champion-man/
├── app/
│   ├── api/
│   │   ├── order/route.ts          # Buyurtma + Telegram + CAPI
│   │   └── meta-capi/route.ts      # Boshqa CAPI eventlar
│   ├── globals.css                  # Original CSS (o'zgartirilmagan)
│   ├── layout.tsx                   # Root layout + Meta Pixel
│   └── page.tsx                     # Asosiy sahifa
├── components/
│   ├── MetaPixel.tsx                # Meta Pixel + tracking helperlar
│   ├── Navbar.tsx                   # Navigatsiya
│   ├── Counter.tsx                  # Animatsion raqamlar
│   └── OrderModal.tsx               # Buyurtma formasi
├── lib/
│   └── meta-capi.ts                 # CAPI server-side helper
├── public/
│   └── image.png                    # Mahsulot rasmi
├── .env.local.example               # Atrof-muhit o'zgaruvchilari namunasi
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🚀 O'rnatish

### 1. Bog'liqliklarni o'rnatish

```bash
npm install
```

### 2. `.env.local` yaratish

`.env.local.example` ni nusxalab `.env.local` qiling:

```bash
cp .env.local.example .env.local
```

Keyin `.env.local` faylini ochib quyidagilarni to'ldiring:

```env
# Telegram (allaqachon to'ldirilgan)
TELEGRAM_BOT_TOKEN=8772794106:AAHWLntSm79O9S2C7fhpIV6PGS-QStqPvhI
TELEGRAM_CHAT_ID=8535384193

# Meta Pixel ID - Events Managerdan olasiz
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# CAPI Access Token - Events Manager > Settings > Generate Access Token
META_CAPI_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxx

# Faqat test paytida! Production'da bo'sh qoldiring
META_TEST_EVENT_CODE=

# Saytingiz URL'i
NEXT_PUBLIC_SITE_URL=https://champion-man.uz
```

### 3. Ishga tushirish

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## 📊 Meta Pixel + CAPI sozlash

### A) Pixel ID olish

1. [Facebook Events Manager](https://business.facebook.com/events_manager) ga kiring
2. **Data Sources** > **Pixel** ni tanlang (yoki yangi yarating)
3. **Pixel ID** ni nusxalab `.env.local`'da `NEXT_PUBLIC_META_PIXEL_ID`'ga qo'ying

### B) CAPI Access Token olish

1. Events Manager'da Pixel'ni tanlang
2. **Settings** tab'iga o'ting
3. Pastga tushib **Conversions API** bo'limiga boring
4. **Generate Access Token** ni bosing
5. Tokenni nusxalab `.env.local`'da `META_CAPI_ACCESS_TOKEN`'ga qo'ying

### C) Test qilish

1. Events Manager > **Test Events** tab'iga o'ting
2. **Test Event Code**'ni nusxalang (masalan: `TEST12345`)
3. `.env.local`'da `META_TEST_EVENT_CODE=TEST12345` qiling
4. Saytda forma to'ldiring
5. Test Events sahifasida `Lead`, `InitiateCheckout`, `PageView` eventlari paydo bo'ladi

> ⚠️ **Muhim:** Productionda `META_TEST_EVENT_CODE` ni bo'sh qoldiring!

### D) Deduplication tekshirish

Meta Events Manager > **Overview**'da har bir event uchun:
- **Browser** (Pixel)
- **Server** (CAPI)
- **Deduplicated** (ikkalasi bir xil `eventID` ishlatgani uchun)

Agar to'g'ri sozlangan bo'lsa, "Deduplicated" raqami yuqori bo'ladi.

## 🎯 Yuborilayotgan eventlar

| Event | Qachon | Joyi |
|-------|--------|------|
| `PageView` | Sahifa ochilganda | Pixel + CAPI |
| `InitiateCheckout` | Modal ochilganda | Pixel + CAPI |
| `Lead` | Forma yuborilganda | Pixel + CAPI |

## 🔐 Xavfsizlik

- ✅ Tokenlar `NEXT_PUBLIC_` bo'lmagan ENV'larda - frontend'ga chiqmaydi
- ✅ Telefon, ism, familiya CAPI'ga **SHA-256 hashlangan** holda yuboriladi
- ✅ IP va User-Agent server tomonidan olinadi
- ✅ Server-side validatsiya barcha dalalar uchun

## 🌐 Vercel'ga deploy

```bash
# Vercel CLI o'rnating
npm i -g vercel

# Deploy
vercel
```

Vercel Dashboard > Project > **Settings** > **Environment Variables** ga `.env.local`'dagi barcha o'zgaruvchilarni qo'shing.

## 📱 Telegram Bot

Buyurtma quyidagi formatda keladi:

```
🆕 YANGI BUYURTMA!
━━━━━━━━━━━━━━━━━━━━━
📦 Mahsulot: Champion Man
👤 Ism: Akmal
👨 Familiya: Karimov
🎂 Yosh: 35
📍 Viloyat: Toshkent shahar
📞 Telefon: +998901234567
🕐 Vaqt: 07.05.2026, 14:30:25
```

## 🐛 Muammolar

### Meta Pixel ishlamayapti

- Brauzerda **Meta Pixel Helper** kengaytmasini o'rnating
- Console'da `fbq` mavjudligini tekshiring: `console.log(window.fbq)`
- `.env.local`'da `NEXT_PUBLIC_META_PIXEL_ID` to'g'ri kiritilganini tekshiring
- Server'ni qayta ishga tushiring (`.env` o'zgarishidan keyin)

### CAPI eventlar kelmayapti

- Events Manager > **Test Events**'da test code'ni qo'ying
- Server log'larini tekshiring: `[Meta CAPI]` bilan boshlangan xabarlar
- Access Token muddati tugamaganini tekshiring

### Telegram xabar kelmayapti

- Bot token va chat ID to'g'riligini tekshiring
- Botga `/start` yuborgan bo'lishingiz kerak (chat ochish uchun)
- Server log'larini ko'ring

## 📞 Qo'llab-quvvatlash

- Telegram: [@champion_men_uzb](https://t.me/champion_men_uzb)
- Telefon: +998 55 515 90 96

---

© 2026 Champion Man. 100% Tabiiy mahsulot.
# Champion-man
