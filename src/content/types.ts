export type Page = "home" | "about" | "news" | "services"

export type NewsCategory = "Events" | "Projects" | "News"

export interface ImageAttribution {
  source?: string
  sourceUrl?: string
  license?: string
  licenseUrl?: string
}

export interface NewsPost {
  slug: string
  title: string
  date: string
  category: NewsCategory
  excerpt: string
  coverImage: string
  coverImageAlt: string
  body: string
}

export interface CarouselItem {
  image: string
  imageAlt: string
  attribution?: ImageAttribution
  label: string
  heading: string
  subheading: string
}

export interface Species {
  emoji: string
  label: string
  color: string
  image: string
  attribution?: ImageAttribution
  species: string[]
  description: string
  tags: string[]
}

export interface ServiceItem {
  title: string
  text: string
}

export interface ServiceSection {
  id: string
  image: string
  imageAlt: string
  attribution?: ImageAttribution
  title: string
  intro: string
  services: ServiceItem[]
}
