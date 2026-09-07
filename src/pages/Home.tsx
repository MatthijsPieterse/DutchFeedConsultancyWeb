import type { Page } from "../App"
import ImageCarousel from "../components/ImageCarousel"
import FlipCard from "../components/FlipCard"
import { assetUrl, homeContent, species } from "../content/content"
import { newsPosts } from "../content/news"

interface HomeProps {
  navigate: (page: Page, sectionId?: string) => void
  openNewsPost: (slug: string) => void
}

function ServiceIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    advisory:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    additives:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    training:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    support:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  }
  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d={paths[icon]}
      />
    </svg>
  )
}

export default function Home({ navigate, openNewsPost }: HomeProps) {
  const serviceTargets: Record<string, string> = {
    advisory: "advisory",
    additives: "rawmaterials",
    training: "training",
    support: "technical",
  }
  return (
    <div>
      <ImageCarousel />
      <div className="bg-navy text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-display font-semibold text-lg text-blue-muted"
          >
            {homeContent.introStrip}
          </p>
          <button
            onClick={() => navigate("about")}
            className="shrink-0 border border-white text-white font-display font-semibold text-sm uppercase tracking-wide px-5 py-2 rounded hover:bg-white hover:text-navy transition-colors"
          >
            {homeContent.aboutButton}
          </button>
        </div>
      </div>

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
              {homeContent.species.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mt-1">
              {homeContent.species.title}
            </h2>
            <p className="text-muted-text mt-3 max-w-2xl">
              {homeContent.species.intro}
            </p>
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 auto-rows-[300px]"
          >
            {species.map((item) => (
              <FlipCard
                key={item.label}
                emoji={item.emoji}
                label={item.label}
                color={item.color}
                imageUrl={assetUrl(item.image)}
                imageAttribution={item.attribution}
                species={item.species}
                description={item.description}
                tags={item.tags}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
                {homeContent.services.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mt-1">
                {homeContent.services.title}
              </h2>
            </div>
            <button
              onClick={() => navigate("services")}
              className="self-start md:self-auto px-6 py-3 bg-navy text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-navy-light transition-colors"
            >
              {homeContent.services.button}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeContent.services.highlights.map((item) => (
              <div
                key={item.title}
                className="border border-warm-gray rounded-lg p-6 hover:border-blue hover:shadow-md transition-all group cursor-pointer"
                onClick={() => navigate("services", serviceTargets[item.icon])}
              >
                <div className="text-navy mb-4 group-hover:text-blue transition-colors">
                  <ServiceIcon icon={item.icon} />
                </div>
                <h3 className="font-display font-bold text-base text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {newsPosts.length > 0 && <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
                {homeContent.news.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mt-1">
                {homeContent.news.title}
              </h2>
            </div>
            <button
              onClick={() => navigate("news")}
              className="self-start md:self-auto px-6 py-3 border-2 border-navy text-navy font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-navy hover:text-white transition-colors"
            >
              {homeContent.news.button}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => openNewsPost(post.slug)}
              >
                <div className="h-48 bg-warm-gray overflow-hidden">
                  <img
                    src={assetUrl(post.coverImage)}
                    alt={post.coverImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-source={undefined}
                    data-source-url={undefined}
                    data-license={undefined}
                    data-license-url={undefined}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-display font-bold uppercase tracking-wide text-red">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-text">
                      —{" "}
                      {new Intl.DateTimeFormat("en", {
                        month: "long",
                        year: "numeric",
                      }).format(new Date(`${post.date}T00:00:00`))}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-navy mb-2 leading-snug group-hover:text-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-text text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <section className="py-14 px-6 bg-red">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
              {homeContent.cta.title}
            </h2>
            <p className="text-white mt-2 opacity-90">{homeContent.cta.text}</p>
          </div>
          <button
            onClick={() => navigate("about", "contact")}
            className="shrink-0 bg-white text-red font-display font-extrabold text-sm uppercase tracking-wide px-7 py-3 rounded hover:bg-cream transition-colors"
          >
            {homeContent.cta.button}
          </button>
        </div>
      </section>
    </div>
  )
}
