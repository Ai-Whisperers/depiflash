export interface NavigationItem {
  label: string
  href: string
}

export interface Navigation {
  businessName: string
  ctaText: string
  ctaHref: string
  items: NavigationItem[]
}

export interface HeroContent {
  image?: string
  headline: string
  headlineTest?: string
  subheadline: string
  ctaPrimaryText: string
  ctaPrimaryHref: string
  ctaSecondaryText: string
  ctaSecondaryHref: string
}

export interface StatItem {
  value: string
  label: string
}

export interface FeatureItem {
  title: string
  description: string
  icon: string
}

export interface ServiceItem {
  name: string
  price: string
  priceUsd?: string
  description: string
  delivery: string
  whatsappCta?: string
  crossSell?: string
}

export interface PortfolioItem {
  title: string
  genre: string
  image: string
  slug: string
  author?: string
  amazonUrl?: string
}

export interface BookItem {
  title: string
  format: string
  achievement: string
  platform?: string
  platformUrl?: string
}

export interface BooksContent {
  title: string
  subtitle: string
  authorPageUrl?: string
  items: BookItem[]
  ctaText?: string
  ctaUrl?: string
}

export interface CredentialItem {
  name: string
  description: string
}

export interface Testimonial {
  name: string
  text: string
  rating: number
  book?: string
  bookLink?: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface ProcessContent {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export interface FinalCta {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
}

export interface HomeSEOCotent {
  title: string
  description: string
}

export interface HomeContent {
  seo: HomeSEOCotent
  hero: HeroContent
  stats: { title: string; items: StatItem[] }
  features: { title: string; items: FeatureItem[] }
  clients?: { title: string; subtitle: string; editorials: string[]; authors: string[] }
  books?: BooksContent
  portfolio: { title: string; subtitle: string; items: PortfolioItem[] }
  services: { title: string; subtitle: string; items: ServiceItem[]; ctaText: string; ctaHref: string }
  testimonials: Testimonial[]
  process: ProcessContent
  finalCta: FinalCta
  newsletter?: { title: string; subtitle: string; placeholder: string; ctaText: string }
}

export interface ValueItem {
  title: string
  description: string
}

export interface AboutContent {
  seo: { title: string; description: string }
  hero: { headline: string; subheadline: string }
  story: { paragraphs: string[] }
  credentials?: { title: string; subtitle: string; items: CredentialItem[] }
  values: ValueItem[]
}

export interface PremadeItem {
  title: string
  genre: string
  image: string
  priceGs: string
  priceUsd: string
  slug: string
}

export interface PremadesContent {
  seo: { title: string; description: string }
  hero: { headline: string; subheadline: string }
  items: PremadeItem[]
  ctaText: string
  ctaHref: string
}

export interface FAQItem {
  question: string
  answer: string
  cta?: string
}

export interface FAQContent {
  seo: { title: string; description: string }
  hero: { headline: string; subheadline: string }
  title: string
  items: FAQItem[]
}

export interface WhatsAppContent {
  defaultMessage: string
  serviceMessage: string
  phone: string
}

export interface ContactInfo {
  title?: string
  phone: string
  whatsapp: string
  email: string
  instagram: string
  facebook: string
  linkedin: string
  address: string
}

export interface ContactoContent {
  seo: { title: string; description: string }
  hero: { headline: string; subheadline: string }
  info: ContactInfo
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterContent {
  description: string
  address: string
  phone: string
  email: string
  instagram: string
  facebook: string
  linkedin: string
  columns: FooterColumn[]
  paymentMethods: string[]
}

export interface Content {
  siteName: string
  businessName: string
  tagline: string
  founded: string
  navigation: Navigation
  home: HomeContent
  about: AboutContent
  servicios: { seo: { title: string; description: string }; hero: { headline: string; subheadline: string } }
  premades: PremadesContent
  portafolio: { seo: { title: string; description: string }; hero: { headline: string; subheadline: string } }
  faq: FAQContent
  whatsapp: WhatsAppContent
  contacto: ContactoContent
  footer: FooterContent
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
