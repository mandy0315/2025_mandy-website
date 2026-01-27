type SortOrder = "ASC" | "DESC";
export const usePosts = async (
  collection: "blog" | "notes" = "blog",
  limit = 9,
) => {
  const LIMIT_COUNT = limit;
  const currentSort = ref<SortOrder>("DESC");
  const currentPage = ref<number>(1);

  // 當排序改變時，重置頁面到第一頁
  watch(currentSort, () => {
    currentPage.value = 1;
  });

  // 取得總文章數量和分頁後的文章資料
  const { data, refresh, pending } = await useAsyncData(
    "post-data",
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
    {
      watch: [currentSort, currentPage],
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
