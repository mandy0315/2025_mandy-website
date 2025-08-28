import { pageInfo } from "@/utils/pageInfoMap";
import { workListGroup } from "@/utils/workListMap/index";
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

  const keywordsToLower = computed(() => keywords.value.toLowerCase() || "");

  // 搜尋(文章/筆記)列表
  const searchInPosts = async (collection: Collection, fields: string[]) => {
    try {
      const list = await queryCollection(collection)
        .orWhere((q) => {
          for (const field of fields) {
            q.where(field, "LIKE", `%${keywordsToLower.value}%`);
          }
          return q;
        })
        .select("title", "description", "path")
        .all();
      if (keywordsToLower.value === "") {
        return list.slice(0, LIMIT_COUNT) || [];
      }
      return list;
    } catch (error) {
      console.error("搜尋文章錯誤", error);
      return [];
    }
  };
  // 搜尋分類
  const searchInCategories = async (collection: Collection) => {
    try {
      if (keywordsToLower.value === "") {
        const allCategories = await queryCollection(collection)
          .select("category")
          .all();
        return allCategories.map((item) => item.category).slice(0, LIMIT_COUNT);
      }

      const categories = await queryCollection(collection)
        .where("category", "LIKE", `%${keywordsToLower.value}%`)
        .select("category")
        .all();
      return categories.map((item) => item.category);
    } catch (error) {
      console.error("搜尋分類錯誤", error);
      return [];
    }
  };
  // 搜尋標籤
  const searchInTags = async (collection: Collection) => {
    try {
      const allPosts = await queryCollection(collection).select("tags").all();

      const allTags = allPosts.map((item) => item.tags || []).flat();
      const uniqueTags = Array.from(new Set(allTags));

      if (keywordsToLower.value === "") {
        return uniqueTags.slice(0, LIMIT_COUNT);
      }
      const matchedTags = uniqueTags.filter((tag) =>
        tag.toLowerCase().includes(keywordsToLower.value)
      );
      return matchedTags;
    } catch (error) {
      console.error("搜尋分類錯誤", error);
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
    if (keywordsToLower.value === "") {
      const firstWorks = Array.from(workListGroup.entries())
        .map(([category, items]) => {
          const firstItem = items[0];
          if (firstItem) {
            return {
              title: firstItem.title,
              path: firstItem.id,
              category: firstItem.category || category,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      return firstWorks;
    }

    const allWork = Array.from(workListGroup.values()).flat();
    const searchWork = allWork.filter((item) =>
      item.title.toLowerCase().includes(keywordsToLower.value)
    );
    const mapSearchWork = searchWork.map((item) => ({
      title: item.title,
      path: item.id,
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
    const kWorks = searchInWorks();

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
    works,
    isSearch,
  };
};

export default useSearch;
