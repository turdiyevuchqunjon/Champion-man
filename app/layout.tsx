import type { Metadata } from 'next';
import Script from 'next/script';
import MetaPixel from '@/components/MetaPixel';
import './globals.css';

export const metadata: Metadata = {
  title: 'Champion Man | Tabiiy erkaklik kuchi',
  description:
    "Champion Man - jinsiy zaiflik va prostata muammolariga 100% tabiiy, halol va Germaniya texnologiyasida ishlab chiqarilgan mahsulot.",
  keywords: 'Champion Man, erkaklik kuchi, testosteron, prostata, tabiiy mahsulot',
  authors: [{ name: 'Champion Man' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0, user-scalable=yes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* AOS CSS */}
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <MetaPixel />
        {children}
        {/* AOS JS */}
        <Script
          src="https://unpkg.com/aos@2.3.1/dist/aos.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
