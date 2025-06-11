import { pageMap } from "@/utils/appMap";

type Collection = "posts" | "notes";
interface Post {
  title: string;
  description: string;
  path: string;
}
interface Page {
  title: string;
  path: string;
}

const useSearch = () => {
  const isShowSearchModal = useState<boolean>("isShowSearchModal", () => false);

  const posts = useState<Post[]>("searchPosts", () => []);
  const notes = useState<Post[]>("searchNotes", () => []);
  const categories_posts = useState<string[]>(
    "searchCategoriesPosts",
    () => []
  );
  const categories_notes = useState<string[]>(
    "searchCategoriesNotes",
    () => []
  );
  const pages = useState<Page[]>("searchPages", () => []);
  const keywords = useState<string>("keywords", () => "");
  const LIMIT_COUNT = 5; // 預設 5 筆列表

  // 搜尋(文章/筆記)列表
  const searchInList = async (
    collection: Collection,
    keyword: string,
    fields: string[]
  ) => {
    try {
      const list = await queryCollection(collection)
        .orWhere((q) => {
          for (const field of fields) {
            q.where(field, "LIKE", `%${keyword}%`);
          }
          return q;
        })
        .select("title", "description", "path")
        .all();
      if (keyword === "") {
        return list.slice(0, LIMIT_COUNT) || [];
      }
      return list;
    } catch (error) {
      console.error("搜尋文章錯誤", error);
      return [];
    }
  };
  // 搜尋分類
  const searchInCategories = async (
    collection: Collection,
    keyword: string
  ) => {
    const { getCategories } = useCategory(collection);
    const categories = await getCategories();
    if (keyword === "") {
      return categories.slice(0, LIMIT_COUNT) || [];
    }
    return (
      categories?.filter((category) => {
        return category.toLowerCase().includes(keyword.toLowerCase());
      }) || []
    );
  };
  // 搜尋頁面
  const searchInPages = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    const pagesValues = pageMap.values();
    if (keyword === "") return Array.from(pagesValues);

    const searchPages = [];
    for (let val of pagesValues) {
      const path = val.path.toLowerCase();
      const title = val.title.toLowerCase();
      const isMatch =
        path.includes(lowerKeyword) || title.includes(lowerKeyword);

      isMatch && searchPages.push(val);
    }
    return searchPages;
  };
  // 設定搜尋列表
  const setSearchList = async () => {
    const [kPosts, kNotes, kCategoriesPosts, kCategoriesNotes] =
      await Promise.all([
        searchInList("posts", keywords.value, ["title", "description"]),
        searchInList("notes", keywords.value, ["title", "description"]),
        searchInCategories("posts", keywords.value),
        searchInCategories("notes", keywords.value),
      ]);
    const kPages = searchInPages(keywords.value);

    posts.value = kPosts;
    notes.value = kNotes;
    categories_posts.value = kCategoriesPosts;
    categories_notes.value = kCategoriesNotes;
    pages.value = kPages;
  };

  const updatedKeywords = (val: string) => {
    keywords.value = val;
    setSearchList();
  };

  const clearAllSearchList = () => {
    posts.value = [];
    notes.value = [];
    categories_notes.value = [];
    categories_posts.value = [];
    pages.value = [];
  };

  return {
    keywords,
    posts,
    notes,
    categories_posts,
    categories_notes,
    pages,
    updatedKeywords,
    isShowSearchModal,
    clearAllSearchList,
  };
};

export default useSearch;
