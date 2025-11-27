interface Post {
  title: string;
  path: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  date: string;
}

type SortOrder = "ASC" | "DESC";
export const usePosts = async (collection: "blog" | "notes" = "blog") => {
  const LIMIT_COUNT = 9;
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
    data: allPosts,
    refresh,
    pending,
  } = await useAsyncData(`${collection}-posts-data`, async () => {
    return await queryCollection(collection)
      .order("date", currentSort.value)
      .select(
        "title",
        "path",
        "category",
        "tags",
        "image",
        "description",
        "date"
      )
      .all();
  });

  const setPaginatePosts = (limit = 1, currentPage = 1) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    // 一頁限有幾筆文章
    const totalPage = Math.ceil(list.length / limit);

    // 頁面的文章
    const postsInPage = list.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    );

    posts.value = {
      list: postsInPage,
      currentPage,
      totalPage,
      totalPosts: list.length,
    };
  };

  const setPosts = (page = 1, limit?: number) => {
    if (allPosts.value) {
      posts.value.list = allPosts.value;
      posts.value.totalPosts = allPosts.value.length;
      const currentlimit = limit || LIMIT_COUNT;
      setPaginatePosts(currentlimit, page);
    }
  };

  const refreshPosts = async (page = 1) => {
    await refresh();
    setPosts(page);
  };

  // 設定分類與標籤文章列表
  const setArchivePosts = (type: "category" | "tags", value: string) => {
    const list = posts.value.list;
    if (list.length === 0) return;

    // type 區分要用 .tags .categories
    const newPosts = posts.value.list.filter((post) => {
      // 轉小寫
      const categoryToLower = post.category.toLowerCase();
      const tagsToLower = post.tags.map((tag) => tag.toLowerCase());
      const valueToLower = value.toLowerCase();

      return type === "category"
        ? categoryToLower === valueToLower
        : tagsToLower.includes(valueToLower);
    });
    if (newPosts && newPosts.length > 0) {
      posts.value.list = newPosts;
      posts.value.totalPosts = newPosts.length;
    }
  };

  const refreshArchivePosts = async ({
    page,
    type,
    value,
  }: {
    page?: number;
    type: "category" | "tags";
    value: string;
  }) => {
    currentSort.value = "DESC";
    await refresh();
    if (allPosts.value) {
      posts.value.list = allPosts.value;
      posts.value.totalPosts = allPosts.value.length;
      setArchivePosts(type, value);
      setPaginatePosts(LIMIT_COUNT, page);
    }
  };

  return {
    allPosts,
    posts,
    pending, // 使用 useAsyncData 內建的 pending 狀態
    currentSort,
    setPosts,
    refreshPosts,
    refreshArchivePosts,
  };
};
