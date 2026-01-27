export const useTag = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data: tagData, refresh } = await useAsyncData(
    `tag-data-${collection}`,
    async () => {
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .select("tags")
        .all();
      if (!data) return [];
      const tags = data.map((item) => item.tags || []).flat();
      const uniqueTags = Array.from(new Set(tags));
      return uniqueTags;
    },
  );

  const tags = computed(() => {
    if (!tagData.value) return [];
    // 判斷是否處理限制數量
    if (limit) {
      return tagData.value.slice(0, limit);
    }
    return tagData.value;
  });

  return {
    refresh,
    tags,
  };
};
