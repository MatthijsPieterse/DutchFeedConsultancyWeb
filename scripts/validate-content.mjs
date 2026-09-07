import fs from "node:fs"
import path from "node:path"
import frontMatter from "front-matter"

const root = process.cwd()
const contentPath = (...parts) => path.join(root, "content", ...parts)
const errors = []

function fail(message) {
  errors.push(message)
}
function readJson(...parts) {
  const file = contentPath(...parts)
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"))
  } catch (error) {
    fail(`${path.relative(root, file)} is not valid JSON: ${error.message}`)
    return null
  }
}
function requiredString(value, name, file) {
  if (typeof value !== "string" || !value.trim())
    fail(`${file}: ${name} is required.`)
}
function checkImage(value, file) {
  if (typeof value !== "string" || !value.startsWith("/images/")) {
    fail(`${file}: image paths must start with /images/.`)
    return
  }
  if (!fs.existsSync(path.join(root, "public", value)))
    fail(`${file}: ${value} does not exist in public/.`)
}
function checkImagesIn(value, file) {
  if (typeof value === "string") {
    for (const image of value.matchAll(/\/images\/[^\s)'"\\]+/g))
      checkImage(image[0], file)
  } else if (Array.isArray(value))
    value.forEach((item) => checkImagesIn(item, file))
  else if (value && typeof value === "object")
    Object.values(value).forEach((item) => checkImagesIn(item, file))
}

const site = readJson("site", "site.json")
if (site) {
  requiredString(site.companyName, "companyName", "content/site/site.json")
  checkImage(site.logo, "content/site/site.json")
}
const home = readJson("home", "home.json")
if (home) checkImagesIn(home, "content/home/home.json")
const about = readJson("about", "about.json")
if (about) {
  checkImage(about?.portrait?.image, "content/about/about.json")
  checkImagesIn(about, "content/about/about.json")
}
const carousel = readJson("carousel", "carousel.json")
if (!Array.isArray(carousel) || carousel.length === 0)
  fail("content/carousel/carousel.json must contain at least one item.")
else
  carousel.forEach((item, index) => {
    const file = `content/carousel/carousel.json item ${index + 1}`
    ;["image", "imageAlt", "label", "heading", "subheading"].forEach((key) =>
      requiredString(item[key], key, file),
    )
    checkImage(item.image, file)
  })
const services = readJson("services", "services.json")
if (services) checkImagesIn(services, "content/services/services.json")

const newsDirectory = contentPath("news")
const newsFiles = fs
  .readdirSync(newsDirectory)
  .filter((file) => file.endsWith(".md"))
for (const filename of newsFiles) {
  const relative = `content/news/${filename}`
  const { attributes, body } = frontMatter(
    fs.readFileSync(path.join(newsDirectory, filename), "utf8"),
  )
  for (const field of [
    "title",
    "date",
    "category",
    "excerpt",
    "coverImage",
    "coverImageAlt",
  ])
    requiredString(attributes[field], field, relative)
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(attributes.date ?? "") ||
    Number.isNaN(Date.parse(attributes.date))
  )
    fail(`${relative}: date must use YYYY-MM-DD.`)
  if (!new Set(["Events", "Projects", "News"]).has(attributes.category))
    fail(`${relative}: category must be Events, Projects, or News.`)
  checkImage(attributes.coverImage, relative)
  if (!body.trim()) fail(`${relative}: article body is required.`)
  checkImagesIn(body, relative)
}

if (errors.length) {
  console.error(
    "Content validation failed:\n" +
      errors.map((error) => `- ${error}`).join("\n"),
  )
  process.exit(1)
}
console.log(`Content validation passed (${newsFiles.length} News posts).`)
