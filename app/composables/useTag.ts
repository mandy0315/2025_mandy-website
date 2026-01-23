export const useTag = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data: allTags, refresh } = await useAsyncData(
    `tag-${collection}-data`,
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
    if (!allTags.value) return [];
    // 判斷是否處理限制數量
    if (limit) {
      return allTags.value.slice(0, limit);
    }
    return allTags.value;
  });

  const refreshTags = async () => {
    await refresh();
  };

  return {
    refreshTags,
    tags,
  };
};
