interface PageInfoMap {
  path: string;
  title: string;
  name: string;
  childrens?: {
    [key: string]: {
      path: string;
      title: string;
      name: string;
    };
  };
}

export const pageInfo = new Map<string, PageInfoMap>([
  ["home", { name: "home", path: "/", title: "首頁" }],
  ["works", { name: "works", path: "/works", title: "作品" }],
  [
    "blog",
    {
      name: "blog",
      path: "/blog",
      title: "部落格",
      childrens: {
        tags: { name: "blog-tags", path: "/blog/tags", title: "標籤總覽" },
        categories: {
          name: "blog-categories",
          path: "/blog/categories",
          title: "分類總覽",
        },
      },
    },
  ],
  [
    "notes",
    {
      name: "notes",
      path: "/notes",
      title: "筆記",

      childrens: {
        tags: { name: "notes-tags", path: "/notes/tags", title: "標籤總覽" },
        categories: {
          name: "notes-categories",
          path: "/notes/categories",
          title: "分類總覽",
        },
      },
    },
  ],
]);
