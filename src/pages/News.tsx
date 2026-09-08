import { useState } from "react"
import { assetUrl, siteContent } from "../content/content"
import { findNewsPost, newsPosts, renderMarkdown } from "../content/news"
import type { NewsCategory } from "../content/types"

const categoryClasses: Record<NewsCategory, string> = {
  Events: "bg-blue",
  Projects: "bg-red",
  News: "bg-green",
}

interface NewsProps {
  slug?: string
  openPost: (slug: string) => void
  showListing: () => void
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

function NewsHeader() {
  return (
    <div className="bg-navy text-white py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <span
          className="text-xs font-display font-bold uppercase tracking-widest text-blue-muted"
        >
          {siteContent.news.eyebrow}
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mt-2">
          {siteContent.news.title}
        </h1>
        <p className="mt-3 max-w-xl text-blue-muted">
          {siteContent.news.intro}
        </p>
      </div>
    </div>
  )
}

export default function News({ slug, openPost, showListing }: NewsProps) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "All">(
    "All",
  )
  const post = slug ? findNewsPost(slug) : undefined
  const categories: (NewsCategory | "All")[] = [
    "All",
    "Events",
    "Projects",
    "News",
  ]
  const filtered =
    activeCategory === "All"
      ? newsPosts
      : newsPosts.filter((item) => item.category === activeCategory)

  if (slug && post)
    return (
      <div className="bg-cream min-h-full">
        <NewsHeader />
        <article className="max-w-4xl mx-auto px-6 py-12">
          <button
            onClick={showListing}
            className="mb-6 text-sm font-display font-bold uppercase tracking-wide text-blue hover:text-red transition-colors"
          >
            ← Back to all news
          </button>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={assetUrl(post.coverImage)}
              alt={post.coverImageAlt}
              className="w-full h-80 object-cover"
              data-source={undefined}
              data-source-url={undefined}
              data-license={undefined}
              data-license-url={undefined}
            />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white ${categoryClasses[post.category]}`}
                >
                  {post.category}
                </span>
                <span className="text-sm text-muted-text">
                  {formatDate(post.date)}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-navy mb-6 leading-tight">
                {post.title}
              </h2>
              <div
                className="markdown-content text-navy leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
              />
            </div>
          </div>
        </article>
      </div>
    )

  if (slug)
    return (
      <div className="bg-cream min-h-full">
        <NewsHeader />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-display font-extrabold text-2xl text-navy">
              Article not found
            </h2>
            <p className="mt-3 text-muted-text">
              This News article does not exist or may have been renamed.
            </p>
            <button
              onClick={showListing}
              className="mt-6 px-5 py-2 bg-navy text-white font-display font-bold text-sm uppercase tracking-wide rounded"
            >
              View all news
            </button>
          </div>
        </div>
      </div>
    )

  return (
    <div className="bg-cream min-h-full">
      <NewsHeader />
      <div className="bg-white border-b border-warm-gray sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-display font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === category
                  ? "bg-navy text-white"
                  : "bg-warm-gray text-navy hover:bg-navy hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <article
            key={item.slug}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <img
              src={assetUrl(item.coverImage)}
              alt={item.coverImageAlt}
              className="w-full h-52 object-cover"
              data-source={undefined}
              data-source-url={undefined}
              data-license={undefined}
              data-license-url={undefined}
            />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className={`text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white ${categoryClasses[item.category]}`}
                >
                  {item.category}
                </span>
                <span className="text-sm text-muted-text">
                  {formatDate(item.date)}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl text-navy mb-3 leading-tight">
                {item.title}
              </h2>
              <p className="text-muted-text leading-relaxed mb-5 flex-1">
                {item.excerpt}
              </p>
              <button
                onClick={() => openPost(item.slug)}
                className="self-start text-sm font-display font-bold uppercase tracking-wide text-blue hover:text-red transition-colors"
              >
                Read article →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
