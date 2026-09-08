import { useState } from "react"
import type { Page } from "../App"
import { assetUrl, siteContent } from "../content/content"
import { hasNews } from "../content/news"

interface NavbarProps {
  currentPage: Page
  navigate: (page: Page, sectionId?: string) => void
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = siteContent.navigation.filter(
    ({ page }) => page !== "news" || hasNews,
  )
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-warm-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <button
          onClick={() => navigate("home")}
          className="flex h-full min-h-0 items-center gap-3 overflow-hidden focus:outline-none"
          aria-label="Go to homepage"
        >
          <img
            src={assetUrl(siteContent.logoNav)}
            alt={siteContent.companyName}
            className="h-full max-h-full max-w-full object-contain"
            data-source={siteContent.logoAttribution.source}
            data-source-url={siteContent.logoAttribution.sourceUrl}
            data-license={siteContent.logoAttribution.license}
            data-license-url={siteContent.logoAttribution.licenseUrl}
          />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => navigate(page as Page)}
              className={`relative px-4 py-2 font-display font-semibold text-sm tracking-wide uppercase transition-colors ${
                currentPage === page ? "text-red" : "text-navy hover:text-blue"
              }`}
            >
              {label}
              {currentPage === page && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-red rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={() => navigate("about", "contact")}
            className="ml-4 px-5 py-2 bg-navy text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-navy-light transition-colors"
          >
            Contact
          </button>
        </nav>
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <span className="text-2xl">×</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-warm-gray px-6 pb-4">
          {navigation.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => {
                navigate(page as Page)
                setMenuOpen(false)
              }}
              className={`block w-full text-left py-3 font-display font-semibold text-sm uppercase tracking-wide border-b border-warm-gray ${
                currentPage === page ? "text-red" : "text-navy"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
