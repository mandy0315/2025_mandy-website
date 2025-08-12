interface Post {
  title: string;
  path: string;
  categories: string[];
  image: string;
  description: string;
  date: string;
}

type SortOrder = "ASC" | "DESC";
export const usePosts = async (collection: "blog" | "notes" = "blog") => {
  const limitCount = 9;
  const currentSort = useState<SortOrder>(`${collection}-sort`, () => "DESC");
  const posts = useState<{
    list: Post[];
    totalPosts: number;
    currentPage?: number;
    totalPage?: number;
  }>(`${collection}-posts`, () => {
    return {
      list: [],
      totalPosts: 0,
    };
  });

  const {
    data: postsData,
    refresh,
    pending,
  } = await useAsyncData(`${collection}-posts-data`, async () => {
    return await queryCollection(collection)
      .order("date", currentSort.value)
      .select("title", "path", "categories", "image", "description", "date")
      .all();
  });

  const setCategoryPosts = (category: string) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    const postsInCategory = posts.value.list.filter((post) =>
      post.categories.includes(category)
    );

    if (postsInCategory && postsInCategory.length > 0) {
      posts.value.list = postsInCategory;
      posts.value.totalPosts = postsInCategory.length;
    }
  };

  const setPaginatePosts = (limitCount = 1, currentPage = 1) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    // 一頁限有幾筆文章
    const totalPage = Math.ceil(list.length / limitCount);

    // 頁面的文章
    const postsInPage = list.slice(
      (currentPage - 1) * limitCount,
      currentPage * limitCount
    );

    posts.value = {
      list: postsInPage,
      currentPage,
      totalPage,
      totalPosts: list.length,
    };
  };

  const setPosts = (page = 1) => {
    if (postsData.value) {
      posts.value.list = postsData.value;
      posts.value.totalPosts = postsData.value.length;
      setPaginatePosts(limitCount, page);
    }
  };

  const refreshPosts = async (page = 1) => {
    await refresh();
    setPosts(page);
  };

  const refreshCategoryPosts = async (page = 1, category: string) => {
    currentSort.value = "DESC";
    await refresh();
    if (postsData.value) {
      posts.value.list = postsData.value;
      posts.value.totalPosts = postsData.value.length;
      setCategoryPosts(category);
      setPaginatePosts(limitCount, page);
    }
  };

  return {
    posts,
    pending, // 使用 useAsyncData 內建的 pending 狀態
    currentSort,
    setPosts,
    refreshPosts,
    refreshCategoryPosts,
  };
};
