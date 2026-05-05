"use client"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://viajero.paragu-ai.com"

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const storeSchema = (name: string, desc: string, url: string, phone: string) => ({
  "@context": "https://schema.org",
  "@type": "Store",
  name, description: desc, url, telephone: phone,
})

export const faqSchema = (items: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(i => ({
    "@type": "Question",
    name: i.question,
    acceptedAnswer: { "@type": "Answer", text: i.answer },
  })),
})

export const articleSchema = (title: string, desc: string, date: string, author: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title, description: desc, datePublished: date, author: { "@type": "Person", name: author },
})

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem", position: i + 1, name: item.name, item: `${BASE_URL}${item.url}`,
  })),
})

export const productSchema = (name: string, desc: string, price: number, currency: string, url: string, image?: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name, description: desc,
  offers: { "@type": "Offer", price, priceCurrency: currency, url: `${BASE_URL}${url}` },
  ...(image ? { image } : {}),
})
