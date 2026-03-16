export const metadata = {
  metadataBase: new URL("https://asistania.com"),
  title: {
    default: "Asistania | WhatsApp AI Asistan - 7/24 Yapay Zeka Destekli Müşteri Hizmetleri",
    template: "%s | Asistania",
  },
  description: "WhatsApp üzerinden yapay zeka destekli müşteri asistanı. 7/24 otomatik cevaplama, randevu alma, CRM entegrasyonu. Emlak, sağlık, güzellik, fitness sektörlerine özel AI çözümler. 499 TL/ay'dan başlayan fiyatlarla işletmenizin müşteri hizmetlerini otomatikleştirin.",
  keywords: ["whatsapp chatbot","whatsapp bot","whatsapp otomasyon","yapay zeka asistan","ai müşteri hizmetleri","chatbot türkiye","işletme asistanı","whatsapp business bot","otomatik mesaj yanıtlama","randevu botu","crm entegrasyonu","müşteri hizmetleri otomasyonu","saas türkiye","dijital asistan","7/24 müşteri desteği","kobi dijitalleşme","emlak chatbot","diş kliniği randevu botu","güzellik merkezi bot","fitness bot","restoran sipariş botu","e-ticaret chatbot","yapay zeka müşteri ilişkileri","whatsapp crm","otomatik randevu sistemi","müşteri kazanma","lead toplama","satış otomasyonu","asistania"],
  authors: [{ name: "Asistania", url: "https://asistania.com" }],
  creator: "Asistania",
  publisher: "Asistania",
  applicationName: "Asistania",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Business Software",
  openGraph: {
    title: "Asistania | WhatsApp AI Asistan - 7/24 Yapay Zeka Destekli Müşteri Hizmetleri",
    description: "İşletmeniz için 7/24 çalışan yapay zeka destekli WhatsApp asistanı. Otomatik cevaplama, randevu alma, CRM. 499 TL/ay.",
    url: "https://asistania.com",
    siteName: "Asistania",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asistania | WhatsApp AI Asistan",
    description: "İşletmeniz için 7/24 çalışan yapay zeka destekli WhatsApp asistanı. Siz uyurken bile müşterilerinize cevap verin.",
    creator: "@asistaniaai",
    site: "@asistaniaai",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://asistania.com",
    languages: { "tr-TR": "https://asistania.com" },
  },
  other: {
    "theme-color": "#060610",
    "apple-mobile-web-app-title": "Asistania",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Asistania",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "WhatsApp üzerinden yapay zeka destekli müşteri asistanı. 7/24 otomatik cevaplama, randevu alma, CRM entegrasyonu.",
  url: "https://asistania.com",
  offers: [
    { "@type": "Offer", name: "Başlangıç", price: "499", priceCurrency: "TRY", priceValidUntil: "2026-12-31", description: "1 WhatsApp Hattı, 500 mesaj/ay, AI Asistan 7/24" },
    { "@type": "Offer", name: "Profesyonel", price: "1299", priceCurrency: "TRY", priceValidUntil: "2026-12-31", description: "1 WhatsApp Hattı, 2000 mesaj/ay, Google Takvim, CRM" },
    { "@type": "Offer", name: "Kurumsal", price: "2999", priceCurrency: "TRY", priceValidUntil: "2026-12-31", description: "3 WhatsApp Hattı, Sınırsız mesaj, API erişimi, SLA" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "127", bestRating: "5", worstRating: "1" },
  provider: {
    "@type": "Organization",
    name: "Asistania",
    url: "https://asistania.com",
    email: "info@asistania.com",
    contactPoint: { "@type": "ContactPoint", telephone: "+90-532-783-4244", contactType: "sales", availableLanguage: ["Turkish", "English"] },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "WhatsApp AI Asistan nedir?", acceptedAnswer: { "@type": "Answer", text: "WhatsApp AI Asistan, işletmenizin WhatsApp hattına bağlanan yapay zeka destekli bir müşteri hizmetleri botudur. 7/24 otomatik olarak müşterilerinize cevap verir, randevu alır ve bilgi sağlar." } },
    { "@type": "Question", name: "Asistania nasıl çalışır?", acceptedAnswer: { "@type": "Answer", text: "3 basit adımda: 1) İşletme bilgilerinizi girin, 2) WhatsApp QR kodunu okutun, 3) AI asistanınız 7/24 çalışmaya başlasın. Kurulum 2 dakika sürer." } },
    { "@type": "Question", name: "Asistania fiyatları nedir?", acceptedAnswer: { "@type": "Answer", text: "Başlangıç paketi aylık 499 TL, Profesyonel paket 1.299 TL, Kurumsal paket 2.999 TL'dir. Tüm paketlerde 7/24 AI asistan dahildir." } },
    { "@type": "Question", name: "Hangi sektörlere hizmet veriyorsunuz?", acceptedAnswer: { "@type": "Answer", text: "Emlak, sağlık/diş kliniği, güzellik merkezi, fitness, restoran ve e-ticaret başta olmak üzere tüm sektörlere özel AI asistan şablonları sunuyoruz." } },
    { "@type": "Question", name: "Kurulum ne kadar sürer?", acceptedAnswer: { "@type": "Answer", text: "Kurulum sadece 2 dakika sürer. QR kodu telefonunuzdan okutmanız yeterlidir. Teknik bilgi gerektirmez." } },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
