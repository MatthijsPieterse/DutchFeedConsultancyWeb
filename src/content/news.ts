import frontMatter from "front-matter"
import { marked } from "marked"
import type { NewsCategory, NewsPost } from "./types"

interface NewsFrontmatter {
  title?: unknown
  date?: unknown
  category?: unknown
  excerpt?: unknown
  coverImage?: unknown
  coverImageAlt?: unknown
}

const files = import.meta.glob("../../content/news/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>

function requiredString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`News post ${file} requires a ${field} value.`)
  }
  return value
}

function toPost(path: string, raw: string): NewsPost {
  const { attributes, body } = frontMatter<NewsFrontmatter>(raw)
  const slug = path.split("/").pop()?.replace(/\.md$/, "")
  if (!slug) throw new Error(`Could not determine a slug for ${path}.`)

  const category = requiredString(attributes.category, "category", path)
  if (
    !(["Events", "Projects", "News"] as const).includes(
      category as NewsCategory,
    )
  ) {
    throw new Error(
      `News post ${path} has an unsupported category: ${category}.`,
    )
  }
  if (body.trim() === "")
    throw new Error(`News post ${path} needs article text.`)

  return {
    slug,
    title: requiredString(attributes.title, "title", path),
    date: requiredString(attributes.date, "date", path),
    category: category as NewsCategory,
    excerpt: requiredString(attributes.excerpt, "excerpt", path),
    coverImage: requiredString(attributes.coverImage, "coverImage", path),
    coverImageAlt: requiredString(
      attributes.coverImageAlt,
      "coverImageAlt",
      path,
    ),
    body,
  }
}

export const newsPosts = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

export const hasNews = newsPosts.length > 0

export function findNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug)
}

export function renderMarkdown(markdown: string) {
  const basePathMarkdown = markdown.replace(
    /\]\(\/images\//g,
    `](${import.meta.env.BASE_URL}images/`,
  )
  return marked.parse(basePathMarkdown, { async: false })
}
