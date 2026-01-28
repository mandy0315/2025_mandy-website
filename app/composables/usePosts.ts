type SortOrder = "ASC" | "DESC";
export const usePosts = async (
  collection: "blog" | "notes" = "blog",
  limit = 10,
) => {
  const LIMIT_COUNT = limit;
  const currentSort = useState<SortOrder>(`${collection}-sort`, () => "DESC");
  const currentPage = useState<number>(`${collection}-page`, () => 1);

  // 當排序改變時，重置頁面到第一頁
  watch([currentPage, currentSort], ([_, newSort], [___, oldSort]) => {
    if (newSort !== oldSort) {
      currentPage.value = 1;
    }
    refresh();
  });

  // 取得總文章數量和分頁後的文章資料
  const { data, refresh, pending } = await useAsyncData(
    `${collection}-${limit}-data`,
    () => {
      const skip = (currentPage.value - 1) * LIMIT_COUNT;
      return Promise.all([
        queryCollection(collection).count(),
        queryCollection(collection)
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
          .all(),
      ]);
    },
  );

  const posts = computed(() => {
    if (!data.value) {
      return {
        list: [],
        totalPosts: 0,
        totalPage: 0,
      };
    }

    const [totalCount, filteredData] = data.value;

    return {
      list: filteredData || [],
      totalPosts: totalCount || 0,
      totalPage: Math.ceil((totalCount || 0) / LIMIT_COUNT),
    };
  });

  return {
    posts,
    pending,
    currentSort,
    currentPage,
    refresh,
  };
};
