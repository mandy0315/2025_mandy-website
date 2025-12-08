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
          return fileName.replace(/^\d+\.\s*/, "").replace(/\.md$/, "");
        };
        const extractCategoriesAndTags = async (
          type: "blog" | "notes",
          filePath: string
        ) => {
          try {
            const content = await fs.readFile(filePath, "utf-8");
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

            if (frontmatterMatch) {
              const frontmatter = frontmatterMatch[1];

              // 提取 category
              const categoryMatch = frontmatter?.match(
                /category:\s*['"]?([^'"\n]+)['"]?/
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
              file.endsWith(".md")
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
                path.join(`content/${folderName}`, file)
              );
            }

            console.log(
              `📝 找到 ${routes.length} 篇${
                folderName === "blog" ? "部落格文章" : "筆記"
              }`
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
                category
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
            } 個分類路由`
          );
          console.log(
            `🏷️ 生成 ${
              tags.flatMap((t) => Array.from(t.set)).length
            } 個標籤路由`
          );

          return allRoutes;
        };

        await buildContentRoutes("blog");
        await buildContentRoutes("notes");

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
  },
  devtools: { enabled: true },

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
