interface Post {
  title: string;
  path: string;
  categories: string[];
  image: string;
  description: string;
  date: string;
}

type SortOrder = "ASC" | "DESC";
export const usePost = async () => {
  const limitCount = 9;
  const isLoading = useState<boolean>("loading", () => false);
  const currentSort = useState<SortOrder>("currentSort", () => "DESC");
  const posts = useState<{
    list: Post[];
    totalPosts: number;
    currentPage?: number;
    totalPage?: number;
  }>("posts", () => {
    return {
      list: [],
      totalPosts: 0,
    };
  });
  const { data: postsData, refresh } = await useAsyncData("posts", async () => {
    return await queryCollection("posts")
      .order("date", currentSort.value)
      .select("title", "path", "categories", "image", "description", "date")
      .all();
  });

  const validateAndFormatSortOrder = (sort: string): SortOrder | null => {
    if (["desc", "asc"].includes(sort)) {
      return sort.toUpperCase() as SortOrder;
    } else {
      showError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
      return null;
    }
  };

  const setPosts = async () => {
    try {
      await refresh();
      if (!postsData.value) return;

      posts.value.list = postsData.value;
      posts.value.totalPosts = postsData.value.length;
    } catch (error) {
      console.error("取得文章錯誤", error);
    }
  };

  const filteredPostsInCategory = (category: string) => {
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

  const updatePosts = async (page = 1, sort = "desc") => {
    isLoading.value = true;
    const sortToUpper = validateAndFormatSortOrder(sort);
    if (sortToUpper) currentSort.value = sortToUpper;

    await setPosts();

    setPaginatePosts(limitCount, page);
    isLoading.value = false;
  };

  const updatePostsInCategory = async (
    currentPage = 1,
    currentCategory = ""
  ) => {
    isLoading.value = true;
    await setPosts();
    filteredPostsInCategory(currentCategory);
    setPaginatePosts(limitCount, currentPage);
    isLoading.value = false;
  };

  return {
    updatePosts,
    posts,
    isLoading,
    updatePostsInCategory,
  };
};
