import about from "../../content/about/about.json"
import carousel from "../../content/carousel/carousel.json"
import home from "../../content/home/home.json"
import services from "../../content/services/services.json"
import site from "../../content/site/site.json"
import type { CarouselItem, ServiceSection, Species } from "./types"

export const siteContent = site
export const homeContent = home
export const aboutContent = about
export const carouselItems = carousel as CarouselItem[]
export const species = services.species as Species[]
export const serviceSections = services.sections as ServiceSection[]
export const servicesContent = services

export function assetUrl(path: string) {
  if (!path.startsWith("/")) return path
  return `${import.meta.env.BASE_URL}${path.slice(1)}`
}
