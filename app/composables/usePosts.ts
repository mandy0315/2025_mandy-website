type SortOrder = "ASC" | "DESC";
export const usePosts = async (
  collection: "blog" | "notes" = "blog",
  limit = 9,
) => {
  const LIMIT_COUNT = limit;
  const currentSort = useState<SortOrder>(`${collection}-sort`, () => "DESC");
  const currentPage = useState<number>(`${collection}-page`, () => 1);

  // 取得總文章數量
  const { data: totalCount } = useAsyncData(`${collection}-total-count`, () =>
    queryCollection(collection).count(),
  );

  // 取得分頁後的文章資料
  const {
    data: filteredData,
    refresh,
    pending,
  } = useAsyncData(`${collection}-posts-data`, () => {
    const skip = (currentPage.value - 1) * LIMIT_COUNT;
    return queryCollection(collection)
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
      .limit(LIMIT_COUNT)
      .skip(skip)
      .all();
  });

  const posts = computed(() => {
    if (!filteredData.value || !totalCount.value) {
      return {
        list: [],
        totalPosts: 0,
        totalPage: 0,
      };
    }

    return {
      list: filteredData.value,
      totalPosts: totalCount.value,
      totalPage: Math.ceil(totalCount.value / LIMIT_COUNT),
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
