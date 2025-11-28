import tailwindcss from "@tailwindcss/vite";

// 統一管理 baseURL
const isGithubPages = process.env.NUXT_APP_GITHUB_ACTIONS === "true";
const baseURL = isGithubPages ? "/2025_mandy-website/" : "/";

export default defineNuxtConfig({
  // SSG 設定
  ssr: true,
  nitro: {
    preset:
      process.env.NUXT_APP_GITHUB_ACTIONS === "true"
        ? "github-pages"
        : "static",

    prerender: {
      routes: [
        "/",
        "/works",
        "/notes",
        "/blog",
        "/notes/categories",
        "/blog/categories",
        "/notes/tags",
        "/blog/tags",
      ],
      crawlLinks: true, // 抓頁面 a 連結內部頁面預渲染
    },
  },

  app: {
    baseURL,
    buildAssetsDir: "/static/",
  },
  devtools: { enabled: true },

  site: {
    name: "Mandy Space Website",
  },
  ogImage: {
    defaults: {
      renderer: "chromium",
      width: 1200,
      height: 630,
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-og-image",
  ],

  css: ["@/styles/tailwind/main.css"],
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true, // 只在開發環境啟用 CSS sourcemap
    },
    build: {
      sourcemap: false,
    },
  },

  runtimeConfig: {
    public: {
      GITHUB_ACTIONS: process.env.NUXT_APP_GITHUB_ACTIONS || "false",
      SHOW_NOTES_PAGE: false,
    },
  },

  icon: {},

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "", // dark mode 掛在 html
  },

  compatibilityDate: "2025-02-17",

  content: {
    experimental: { sqliteConnector: "native" },
  },
});
