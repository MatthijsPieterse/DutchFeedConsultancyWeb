import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Home from "./pages/Home"
import News from "./pages/News"
import Services from "./pages/Services"
import { hasNews } from "./content/news"
import { assetUrl, siteContent } from "./content/content"

export type Page = "home" | "about" | "news" | "services"
interface Route {
  page: Page
  newsSlug?: string
  sectionId?: string
}

function routeFromHash(): Route {
  const segments = window.location.hash
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean)
  if (hasNews && segments[0] === "news" && segments[1])
    return { page: "news", newsSlug: segments[1] }
  if (segments[0] === "news" && !hasNews) return { page: "home" }
  if (["home", "about", "news", "services"].includes(segments[0]))
    return { page: segments[0] as Page, sectionId: segments[1] }
  return { page: "home" }
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash)
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const link = favicon ?? document.createElement("link")
    link.rel = "icon"
    link.href = assetUrl(siteContent.favicon)
    if (!favicon) document.head.appendChild(link)
  }, [])
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  useEffect(() => {
    if (route.sectionId) {
      document.getElementById(route.sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [route])
  const navigate = (page: Page, sectionId?: string) => {
    window.location.hash = `#/${page}${sectionId ? `/${sectionId}` : ""}`
  }
  const openNewsPost = (slug: string) => {
    window.location.hash = `#/news/${slug}`
  }

  return (
    <div className="min-h-full flex flex-col bg-cream text-navy">
      <Navbar currentPage={route.page} navigate={navigate} />
      <main className="flex-1">
        {route.page === "home" && (
          <Home navigate={navigate} openNewsPost={openNewsPost} />
        )}
        {route.page === "about" && <About />}
        {route.page === "news" && (
          <News
            slug={route.newsSlug}
            openPost={openNewsPost}
            showListing={() => navigate("news")}
          />
        )}
        {route.page === "services" && <Services navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
