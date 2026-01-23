import { pageInfo } from "@/utils/pageInfoMap";
import type { WorkItem } from "@/utils/workListMap/works/types";

type Collection = "blog" | "notes";
interface Post {
  title: string;
  description: string;
  path: string;
}
interface Page {
  title: string;
  path: string;
}

interface Work {
  title: string;
  path: string;
  category: WorkItem["category"];
}

const useSearch = async () => {
  const isSearch = useState<boolean>("isSearch", () => false);
  const isShowSearchModal = useState<boolean>("isShowSearchModal", () => false);

  const blog = useState<Post[]>("searchBlog", () => []);
  const notes = useState<Post[]>("searchNotes", () => []);
  const blogCategories = useState<string[]>("searchBlogCategories", () => []);
  const notesCategories = useState<string[]>("searchNotesCategories", () => []);
  const blogTags = useState<string[]>("searchBlogTags", () => []);
  const notesTags = useState<string[]>("searchNotesTags", () => []);
  const pages = useState<Page[]>("searchPages", () => []);
  const works = useState<Work[]>("searchWorks", () => []);
  const keywords = useState<string>("keywords", () => "");
  const LIMIT_COUNT = 5; // 預設 5 筆列表

  // 取得作品資料
  const { allWorks, worksByCategory } = await useWorks();

  const keywordsToLower = computed(() => keywords.value.toLowerCase() || "");

  // 搜尋(文章/筆記)列表
  const searchInPosts = async (collection: Collection, fields: string[]) => {
    try {
      if (keywordsToLower.value === "") {
        const data = await queryCollection(collection)
          .order("date", "DESC")
          .select("title", "description", "path")
          .limit(LIMIT_COUNT)
          .all();
        return data;
      }
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .orWhere((q) => {
          for (const field of fields) {
            q.where(field, "LIKE", `%${keywordsToLower.value}%`);
          }
          return q;
        })
        .select("title", "description", "path")
        .all();
      return data;
    } catch (error) {
      console.error("搜尋文章錯誤", error);
      return [];
    }
  };

  // 搜尋分類
  const searchInCategories = async (collection: Collection) => {
    try {
      if (keywordsToLower.value === "") {
        const data = await queryCollection(collection)
          .order("date", "DESC")
          .select("category")
          .all();
        const categories = data.map((item) => item.category);
        const uniqueCategories = Array.from(new Set(categories));
        return uniqueCategories.slice(0, LIMIT_COUNT);
      }

      const data = await queryCollection(collection)
        .order("date", "DESC")
        .where("category", "LIKE", `%${keywordsToLower.value}%`)
        .select("category")
        .all();
      const categories = data.map((item) => item.category);
      const uniqueCategories = Array.from(new Set(categories));
      return uniqueCategories;
    } catch (error) {
      console.error("搜尋分類錯誤", error);
      return [];
    }
  };

  // 搜尋標籤
  const searchInTags = async (collection: Collection) => {
    try {
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .select("tags")
        .all();
      const tags = data.map((item) => item.tags || []).flat();
      const uniqueTags = Array.from(new Set(tags));

      if (keywordsToLower.value === "") {
        return uniqueTags.slice(0, LIMIT_COUNT);
      }
      const matchedTags = uniqueTags.filter((tag) =>
        tag.toLowerCase().includes(keywordsToLower.value),
      );
      return matchedTags;
    } catch (error) {
      console.error("搜尋標籤錯誤", error);
      return [];
    }
  };

  // 搜尋頁面
  const searchInPages = () => {
    const pagesValues = pageInfo.values();

    // 如果關鍵字為空，則返回所有頁面
    if (keywordsToLower.value === "") return Array.from(pagesValues);

    const searchPages = [];
    for (let val of pagesValues) {
      const path = val.path.toLowerCase();
      const title = val.title.toLowerCase();
      const isMatch =
        path.includes(keywordsToLower.value) ||
        title.includes(keywordsToLower.value);

      if (isMatch) {
        searchPages.push(val);
      }
    }
    return searchPages;
  };

  // 搜尋作品
  const searchInWorks = () => {
    if (!allWorks.value || allWorks.value.length === 0) return [];

    if (keywordsToLower.value === "") {
      const randomWorks: Work[] = [];
      for (const category in worksByCategory.value) {
        const worksInCategory =
          worksByCategory.value[category as keyof typeof worksByCategory.value];
        // 隨機一個
        const randomWork =
          worksInCategory[Math.floor(Math.random() * worksInCategory.length)];
        if (randomWork) {
          randomWorks.push({
            title: randomWork.title,
            path: randomWork.id,
            category: randomWork.category,
          });
        }
      }

      return randomWorks;
    }

    // 搜尋符合關鍵字的作品
    const searchWork = allWorks.value.filter((item) =>
      item.title.toLowerCase().includes(keywordsToLower.value),
    );

    const mapSearchWork = searchWork.map((item) => ({
      title: item.title,
      path: item.id, // 使用處理過的 id
      category: item.category,
    }));

    return mapSearchWork;
  };

  // 設定搜尋列表
  const updateSearchList = async () => {
    isSearch.value = false;
    const [
      kBlog,
      kNotes,
      kBlogCategories,
      kNotesCategories,
      kBlogTags,
      kNotesTags,
    ] = await Promise.all([
      searchInPosts("blog", ["title", "description"]),
      searchInPosts("notes", ["title", "description"]),
      searchInCategories("blog"),
      searchInCategories("notes"),
      searchInTags("blog"),
      searchInTags("notes"),
    ]);
    const kPages = searchInPages();
    const kWorks = searchInWorks(); // 🔥 現在使用新的搜尋邏輯

    blog.value = kBlog;
    notes.value = kNotes;
    blogCategories.value = kBlogCategories;
    notesCategories.value = kNotesCategories;
    blogTags.value = kBlogTags;
    notesTags.value = kNotesTags;
    pages.value = kPages;
    works.value = kWorks;
    isSearch.value = true;
  };

  const closeSearchModal = () => {
    isShowSearchModal.value = false;
    keywords.value = "";
  };

  return {
    keywords,
    blog,
    notes,
    blogCategories,
    notesCategories,
    blogTags,
    notesTags,
    pages,
    updateSearchList,
    isShowSearchModal,
    closeSearchModal,
    works,
    isSearch,
  };
};

export default useSearch;
