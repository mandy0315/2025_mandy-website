import tailwindcss from "@tailwindcss/vite";

// 部署設定集中管理
const deployConfig = {
  isCustomDomain: process.env.IS_CUSTOM_DOMAIN === "true",
  repositoryName: "2025_mandy-website",
  customDomain: "https://mandy315.com",
};

const getBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "/";
  }

  return deployConfig.isCustomDomain ? "/" : `/${deployConfig.repositoryName}/`;
};

const getSiteURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return deployConfig.isCustomDomain
    ? deployConfig.customDomain
    : `https://mandy0315.github.io/${deployConfig.repositoryName}/`;
};

const baseURL = getBaseURL();
const siteURL = getSiteURL();

console.log("🔧 建置設定:", {
  NODE_ENV: process.env.NODE_ENV,
  baseURL,
  siteURL,
});

export default defineNuxtConfig({
  // SSG 設定
  nitro: {
    preset: "static", // 部署到任何靜態託管服務

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
      SHOW_NOTES_PAGE: false,
      BASE_URL: baseURL,
    },
  },

  icon: {
    mode: "local",

    // 指定已安裝的圖示集
    serverBundle: {
      collections: ["logos", "mdi", "solar"],
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
  },

  ogImage: {
    fonts: ["Noto+Sans+TC:700"],
    defaults: {
      extension: "jpeg", // 預設 png 改為 jpeg
    },
  },
});
