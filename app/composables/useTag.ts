export const useTag = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data, refresh } = await useAsyncData(`tag-${collection}-data`, () => {
    return queryCollection(collection)
      .order("date", "DESC")
      .select("tags")
      .all();
  });

  const tags = computed(() => {
    if (!data.value) return [];
    const tags = data.value.map((item) => item.tags || []).flat();
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags.slice(0, limit);
  });

  const refreshTags = async (limit?: number) => {
    await refresh();
  };

  return {
    refreshTags,
    tags,
  };
};
