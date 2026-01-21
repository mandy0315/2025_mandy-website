type SortOrder = "ASC" | "DESC";
export const useArchivePosts = async ({
  type,
  collection = "blog",
  limit = 9,
}: {
  type: "category" | "tags";
  collection?: "blog" | "notes";
  limit?: number;
}) => {
  const route = useRoute();
  const LIMIT_COUNT = limit;
  const currentSort = useState<SortOrder>(
    `${collection}-archive-sort`,
    () => "DESC",
  );
  const currentPage = useState<number>(`${collection}-archive-page`, () => 1);

  const currentValue = computed(() => {
    const paramKey = type === "tags" ? "tag" : "category";
    const value = (route.params?.[paramKey] as string) || "";
    return decodeURIComponent(value);
  });

  // 取得所有篩選後的資料
  const {
    data: filteredPosts,
    refresh,
    pending,
  } = useAsyncData(`${collection}-archive-${type}`, async () => {
    const allData = await queryCollection(collection)
      .order("date", currentSort.value)
      .select(
        "title",
        "path",
        "category",
        "tags",
        "image",
        "description",
        "date",
      )
      .all();

    if (!allData) return [];

    return allData.filter((post) => {
      const categoryToLower = post.category.toLowerCase();
      const tagsToLower = post.tags.map((tag) => tag.toLowerCase());
      const valueToLower = currentValue.value.toLowerCase();

      return type === "category"
        ? categoryToLower === valueToLower
        : tagsToLower.includes(valueToLower);
    });
  });

  const posts = computed(() => {
    if (!filteredPosts.value)
      return {
        list: [],
        totalPosts: 0,
        totalPage: 0,
      };

    const totalPosts = filteredPosts.value.length;
    const totalPage = Math.ceil(totalPosts / LIMIT_COUNT);
    const skip = (currentPage.value - 1) * LIMIT_COUNT;
    const list = filteredPosts.value.slice(skip, skip + LIMIT_COUNT);

    return {
      list,
      totalPosts,
      totalPage,
    };
  });

  const refreshPosts = async () => {
    await refresh();
  };

  return {
    posts,
    pending,
    currentSort,
    currentPage,
    refreshPosts,
  };
};
