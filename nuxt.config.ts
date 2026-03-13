import tailwindcss from "@tailwindcss/vite";

// 部署設定集中管理
const deployConfig = {
  isCustomDomain: process.env.IS_CUSTOM_DOMAIN === "true",
  isPagesDeploy: process.env.IS_PAGES_DEPLOY === "true",
  repositoryName: "2025_mandy-website",
  customDomain: "https://mandy315.com",
};

const getBaseURL = () => {
  return deployConfig.isPagesDeploy && !deployConfig.isCustomDomain
    ? `/${deployConfig.repositoryName}/`
    : "/";
};

const baseURL = getBaseURL();
const siteURL = deployConfig.customDomain;

console.log("🔧 建置設定:", {
  baseURL,
  siteURL,
});

export default defineNuxtConfig({
  // SSG 設定
  nitro: {
    preset: "github-pages", // 部署到github-pages

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
        "/sitemap.xml",
      ],
    },
  },
  /** 註冊其他路由
   * https://nuxt.com/docs/4.x/getting-started/prerendering#prerenderroutes-nuxt-hook */
  hooks: {
    "prerender:routes": async (ctx) => {
      console.log("🔍 正在生成其他動態路由...");

      try {
        const fs = await import("fs/promises");
        const path = await import("path");

        const contentRoutes: string[] = [];
        const blogCategories = new Set<string>();
        const blogTags = new Set<string>();
        const notesCategories = new Set<string>();
        const notesTags = new Set<string>();

        // 清理檔名，去除數字編號和副檔名
        const cleanFileName = (fileName: string) => {
          return fileName.replace(/^\d+\.\s*/, "").replace(/\.(md|json)$/, "");
        };
        const extractCategoriesAndTags = async (
          type: "blog" | "notes",
          filePath: string,
        ) => {
          try {
            const content = await fs.readFile(filePath, "utf-8");
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

            if (frontmatterMatch) {
              const frontmatter = frontmatterMatch[1];

              // 提取 category
              const categoryMatch = frontmatter?.match(
                /category:\s*['"]?([^'"\n]+)['"]?/,
              );
              if (categoryMatch) {
                const category = categoryMatch[1]?.trim();
                if (category) {
                  if (type === "blog") {
                    blogCategories.add(category);
                  } else {
                    notesCategories.add(category);
                  }
                }
              }

              // 提取 tags
              const tagsMatch = frontmatter?.match(/tags:\s*\[(.*?)\]/);
              if (tagsMatch) {
                const tagsList = tagsMatch[1]
                  ?.split(",")
                  .map((tag) => tag.replace(/['"]/g, "").trim())
                  .filter(Boolean);

                tagsList?.forEach((tag) => {
                  if (type === "blog") {
                    blogTags.add(tag);
                  } else {
                    notesTags.add(tag);
                  }
                });
              }
            }
          } catch (error) {
            console.warn(`無法解析檔案：${filePath}`);
          }
        };
        const buildContentRoutes = async (folderName: "blog" | "notes") => {
          try {
            const markdownFiles = await fs.readdir(`content/${folderName}`);

            // 過濾出 .md 檔案
            const mdFiles = markdownFiles.filter((file) =>
              file.endsWith(".md"),
            );

            // 生成路由
            const routes = mdFiles.map((file) => {
              const cleanedName = cleanFileName(file);
              return `/${folderName}/${cleanedName}`;
            });

            contentRoutes.push(...routes);

            // 解析每個檔案的 frontmatter
            for (const file of mdFiles) {
              await extractCategoriesAndTags(
                folderName,
                path.join(`content/${folderName}`, file),
              );
            }

            console.log(
              `📝 找到 ${routes.length} 篇${
                folderName === "blog" ? "部落格文章" : "筆記"
              }`,
            );

            return routes;
          } catch (error) {
            console.log(`📝 ${folderName} 資料夾不存在或為空`);
            return [];
          }
        };
        const getCategoryAndTagRoutes = () => {
          const allRoutes: string[] = [];

          // 生成分類路由
          const categories = [
            { type: "blog", set: blogCategories },
            { type: "notes", set: notesCategories },
          ];

          categories.forEach(({ type, set }) => {
            set.forEach((category) => {
              const route = `/${type}/categories/${encodeURIComponent(
                category,
              )}`;
              allRoutes.push(route);
            });
          });

          // 生成標籤路由
          const tags = [
            { type: "blog", set: blogTags },
            { type: "notes", set: notesTags },
          ];

          tags.forEach(({ type, set }) => {
            set.forEach((tag) => {
              const route = `/${type}/tags/${encodeURIComponent(tag)}`;
              allRoutes.push(route);
            });
          });

          console.log(
            `📂 生成 ${
              categories.flatMap((c) => Array.from(c.set)).length
            } 個分類路由`,
          );
          console.log(
            `🏷️ 生成 ${
              tags.flatMap((t) => Array.from(t.set)).length
            } 個標籤路由`,
          );

          return allRoutes;
        };

        const buildWorksRoutes = async () => {
          try {
            const jsonFiles = await fs.readdir("content/works");

            // 過濾出 .json 檔案
            const workFiles = jsonFiles.filter((file) =>
              file.endsWith(".json"),
            );

            // 生成作品路由
            const routes = workFiles.map((file) => {
              const workId = cleanFileName(file);
              return `/works/${workId}`;
            });

            contentRoutes.push(...routes);
            console.log(`🎨 找到 ${routes.length} 個作品`);

            return routes;
          } catch (error) {
            console.log("🎨 works 資料夾不存在或為空");
            return [];
          }
        };

        await buildContentRoutes("blog");
        await buildContentRoutes("notes");
        await buildWorksRoutes();

        const categoryAndTagRoutes = getCategoryAndTagRoutes();

        // 將所有路由加入到預渲染清單
        const allNewRoutes = [...contentRoutes, ...categoryAndTagRoutes];

        for (const route of allNewRoutes) {
          ctx.routes.add(route);
        }
      } catch (error) {
        console.warn("❌ 生成路由時發生錯誤：", error);
      }
    },
  },

  app: {
    baseURL,
    buildAssetsDir: "/static/",
    head: {
      htmlAttrs: {
        lang: "zh-TW",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: `${baseURL}favicon.ico`,
        },
        // 優化 Google Fonts 載入
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        // 直接載入字型，設定 media 為 "print" 以延遲載入，並在載入完成後切換到 "all"
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@700&display=swap&subset=latin,latin-ext&text=0123456789",
          media: "print", // 初始設定為「列印模式」樣式表
          onload: "this.media='all'", // 載入完成後切換到「所有媒體」
        },
      ],
    },
  },
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxt/content",
    "@nuxt/test-utils/module",
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
  imports: {
    dirs: ["@/composables/**"],
  },

  runtimeConfig: {
    public: {
      SHOW_NOTES_PAGE: false,
      BASE_URL: baseURL,
      SITE_URL: siteURL,
    },
  },

  icon: {
    mode: "local",
    // 指定已安裝的圖示集
    serverBundle: {
      collections: ["logos", "mdi", "solar"],
    },
    clientBundle: {
      scan: {
        // 只掃描這些資料夾中使用的圖示
        globInclude: ["components/**", "pages/**", "layouts/**"],
      },
    },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "", // dark mode 掛在 html
  },

  compatibilityDate: "2025-02-17",

  content: {
    experimental: { sqliteConnector: "native" },
  },

  site: {
    url: siteURL,
    name: "MandySpace",
    /** 開發環境下可以看到 robots.txt 設定
     *
     * `/robots.txt?mockProductionEnv=true` */
    env: "production",
  },

  ogImage: {
    fonts: ["Noto+Sans+TC:700"],
    defaults: {
      extension: "png",
    },
  },
  robots: {
    disallow: ["/notes/**"],
    sitemap: `${siteURL}/sitemap.xml`,
  },
});
