import type { Page } from "../App"
import { assetUrl, siteContent } from "../content/content"
import { hasNews } from "../content/news"

interface FooterProps {
  navigate: (page: Page, sectionId?: string) => void
}

export default function Footer({ navigate }: FooterProps) {
  const navigation = siteContent.navigation.filter(
    ({ page }) => page !== "news" || hasNews,
  )
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="inline-block rounded-xl overflow-hidden bg-[#F3F4F1] p-3 mb-4">
            <img
              src={assetUrl(siteContent.logo)}
              alt={siteContent.companyName}
              className="h-25 rounded-xl object-contain"
              data-source={siteContent.logoAttribution.source}
              data-source-url={siteContent.logoAttribution.sourceUrl}
              data-license={siteContent.logoAttribution.license}
              data-license-url={siteContent.logoAttribution.licenseUrl}
            />
          </div>
          <p
            className="text-sm text-blue-muted leading-relaxed max-w-xs"
          >
            {siteContent.footer.description}
          </p>
        </div>
        <div>
          <h4
            className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-blue-muted"
          >
            Navigation
          </h4>
          <ul className="space-y-2">
            {navigation.map(({ label, page }) => (
              <li key={page}>
                <button
                  onClick={() => navigate(page as Page)}
                  className="text-sm text-white hover:text-red transition-colors"
                >
                  {page === "services" ? "Consultancy & Services" : label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4
            className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-blue-muted"
          >
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="hover:text-red transition-colors"
              >
                {siteContent.contact.email}
              </a>
            </li>
            <li>{siteContent.contact.phone}</li>
            <li>{siteContent.contact.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-light">
        <div
          className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-[#6b8aaa]"
        >
          <span>
            © {new Date().getFullYear()} {siteContent.footer.copyright}
          </span>
          <span>{siteContent.contact.companyNumber}</span>
        </div>
      </div>
    </footer>
  )
}
