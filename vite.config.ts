import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath, URL } from "node:url"

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const githubPagesBase =
  process.env.GITHUB_ACTIONS === "true" && repositoryName
    ? `/${repositoryName}/`
    : (process.env.VITE_BASE_PATH ?? "/")

export default defineConfig({
  base: githubPagesBase,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
