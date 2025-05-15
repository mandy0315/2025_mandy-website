import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
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
      routes: ["/", "/posts", "/categories-notes/**", "/categories-posts/**"], // 預先渲染的路由
    },
  },

  routeRules: {
    // 靜態页面
    "/": { prerender: true },
    "/posts": { prerender: true },
    "/categories-posts/**": { prerender: true },
    "/categories-notes/**": { prerender: true },

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
  },

  content: {
    experimental: { nativeSqlite: true },
  },
});
