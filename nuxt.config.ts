import tailwindcss from "@tailwindcss/vite";

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
    baseURL:
      process.env.NUXT_APP_GITHUB_ACTIONS === "true"
        ? "/2025_mandy-website/"
        : "/",
    buildAssetsDir: "/static/",
    head: {
      htmlAttrs: {
        lang: "zh-TW", // 中文
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "author",
          content: "蔡敏佳 (Mandy Tsai)",
        },
        {
          name: "copyright",
          content: "2025 mandy space. All rights reserved.",
        },
        // {
        //   property: "og:image",
        //   content: "/images/og-image.png",
        // },
        // {
        //   property: "og:url",
        //   content: "https://mandy.space",
        // },
      ],
    },
  },
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
  ],

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
      GITHUB_ACTIONS: process.env.NUXT_APP_GITHUB_ACTIONS,
    },
  },

  css: ["@/styles/tailwind/main.css"],

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
