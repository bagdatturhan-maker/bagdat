export const metadata = {
  title: "Asistania | WhatsApp AI Asistan - İşletmeniz İçin 7/24 Yapay Zeka",
  description: "WhatsApp üzerinden yapay zeka destekli müşteri asistanı. 7/24 otomatik cevaplama, randevu alma, müşteri desteği. Emlak, sağlık, güzellik, fitness sektörlerine özel çözümler. Aylık 499 TL'den başlayan fiyatlarla.",
  keywords: "whatsapp chatbot, whatsapp bot, yapay zeka asistan, ai müşteri hizmetleri, whatsapp otomasyon, chatbot türkiye, işletme asistanı, randevu botu, crm entegrasyonu, saas",
  openGraph: {
    title: "Asistania | WhatsApp AI Asistan",
    description: "İşletmeniz için 7/24 çalışan yapay zeka destekli WhatsApp asistanı. Siz uyurken bile müşterilerinize cevap verin.",
    url: "https://asistania.com",
    siteName: "Asistania",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asistania | WhatsApp AI Asistan",
    description: "İşletmeniz için 7/24 çalışan yapay zeka destekli WhatsApp asistanı.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://asistania.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
