import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
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
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["@/styles/tailwind/main.css"],

  icon: {
    serverBundle: {
      collections: ["solar", "logos"],
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "", // dark mode 掛在 html
  },

  compatibilityDate: "2025-02-17",

  nitro: {
    preset: process.env.VL_BUILD ? "vercel" : undefined,
    prerender: {
      crawlLinks: true, // 連結預先渲染
      routes: ["/", "/posts", "/works"], // 預先渲染的路由
    },
  },

  routeRules: {
    // 靜態頁面
    "/": { prerender: true },
    "/posts": { prerender: true },
    "/works": { prerender: true },

    // 動態路由 - SSR模式
    "/posts/**": {
      prerender: false,
      cache: {
        maxAge: 60 * 10, // 緩存10分鐘
        staleMaxAge: 60 * 60 * 24, // 過期後可用 24 小時，並同時在後台更新
      },
    },
    "/notes/**": {
      prerender: false,
      cache: {
        maxAge: 60 * 10, // 緩存10分鐘
        staleMaxAge: 60 * 60 * 24, // 過期後可用 24 小時，並同時在後台更新
      },
    },
    "/categories-posts/**": {
      prerender: false,
    },
    "/categories-notes/**": {
      prerender: false,
    },
  },

  content: {
    experimental: { nativeSqlite: true },
  },

  imports: {
    dirs: ["composables"],
  },
});
