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
    `${collection}-${type}-sort`,
    () => "DESC",
  );
  const currentPage = useState<number>(`${collection}-${type}-page`, () => 1);

  const currentValue = computed(() => {
    const paramKey = type === "tags" ? "tag" : "category";
    const value = (route.params?.[paramKey] as string) || "";
    return decodeURIComponent(value);
  });

  watch(
    [currentPage, currentSort, currentValue],
    ([_, newSort, __], [___, oldSort, ____]) => {
      if (newSort !== oldSort) {
        currentPage.value = 1;
      }
      refresh();
    },
  );

  // 取得所有篩選後的資料
  const { data, refresh, pending } = useAsyncData(
    `${collection}-${type}-${limit}-data`,
    () => {
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
        .all();
    },
  );

  const getFilteredPosts = () => {
    if (!data.value) return [];

    return data.value.filter((post) => {
      const categoryToLower = post.category.toLowerCase();
      const tagsToLower = post.tags.map((tag) => tag.toLowerCase());
      const valueToLower = currentValue.value.toLowerCase();

      return type === "category"
        ? categoryToLower === valueToLower
        : tagsToLower.includes(valueToLower);
    });
  };
  const posts = computed(() => {
    const filtered = getFilteredPosts();

    if (!filtered.length)
      return {
        list: [],
        totalPosts: 0,
        totalPage: 0,
      };

    const totalPosts = filtered.length;
    const totalPage = Math.ceil(totalPosts / LIMIT_COUNT);
    const skip = (currentPage.value - 1) * LIMIT_COUNT;
    const list = filtered.slice(skip, skip + LIMIT_COUNT);

    return {
      list,
      totalPosts,
      totalPage,
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
