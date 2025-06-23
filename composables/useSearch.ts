import { pageMap } from "@/utils/appMap";
import {
  workDataMap,
  workCategories,
  type WorkItem,
} from "@/utils/workDataMap";

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

const useSearch = async () => {
  const isSearch = useState<boolean>("isSearch", () => false);
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
  const works = useState<WorkItem[]>("searchWorks", () => []);
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
    const res = await queryCollection(collection)
      .order("date", "DESC")
      .select("categories")
      .all();

    // 從每篇文章/筆記提取 categories 欄位
    const selectedCategories = res.map((item) => item.categories).flat();
    const uniqueCategories = [...new Set(selectedCategories)]; // 去除重複的分類

    // 如果關鍵字為空，則返回前面 LIMIT_COUNT 個分類
    if (keyword === "") {
      return uniqueCategories.slice(0, LIMIT_COUNT) || [];
    }

    // 過濾分類
    if (uniqueCategories.length === 0) return [];
    return uniqueCategories.filter((category) =>
      category.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  // 搜尋頁面
  const searchInPages = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    const pagesValues = pageMap.values();

    // 如果關鍵字為空，則返回所有頁面
    if (keyword === "") return Array.from(pagesValues);

    const searchPages = [];
    for (let val of pagesValues) {
      const path = val.path.toLowerCase();
      const title = val.title.toLowerCase();
      const isMatch =
        path.includes(lowerKeyword) || title.includes(lowerKeyword);

      if (isMatch) {
        searchPages.push(val);
      }
    }
    return searchPages;
  };
  const searchInWorks = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    const worksValues = Array.from(workDataMap.values()).flat();

    if (keyword === "") {
      const firstWorksInCategories = workCategories
        .map((category) => workDataMap.get(category)?.[0])
        .filter((item): item is WorkItem => item !== undefined);
      return firstWorksInCategories;
    }

    if (worksValues.length === 0) return [];
    return worksValues.filter((work: WorkItem) =>
      work.title.toLowerCase().includes(lowerKeyword)
    );
  };
  // 設定搜尋列表
  const setSearchList = async () => {
    isSearch.value = false;
    const [kPosts, kNotes, kCategoriesPosts, kCategoriesNotes] =
      await Promise.all([
        searchInList("posts", keywords.value, ["title", "description"]),
        searchInList("notes", keywords.value, ["title", "description"]),
        searchInCategories("posts", keywords.value),
        searchInCategories("notes", keywords.value),
      ]);
    const kPages = searchInPages(keywords.value);
    const kWorks = searchInWorks(keywords.value);

    posts.value = kPosts;
    notes.value = kNotes;
    categories_posts.value = kCategoriesPosts;
    categories_notes.value = kCategoriesNotes;
    pages.value = kPages;
    works.value = kWorks;
    isSearch.value = true;
  };

  const updatedKeywords = (val: string) => {
    keywords.value = val;
    setSearchList();
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
    works,
    isSearch,
  };
};

export default useSearch;
