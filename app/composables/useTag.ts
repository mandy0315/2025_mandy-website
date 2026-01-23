export const useTag = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data: tags, refresh } = await useAsyncData(
    `tag-${collection}-data`,
    async () => {
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .select("tags")
        .all();
      if (!data) return [];
      const tags = data.map((item) => item.tags || []).flat();
      const uniqueTags = Array.from(new Set(tags));
      if (limit) {
        return uniqueTags.slice(0, limit);
      }
      return uniqueTags;
    },
  );

  const refreshTags = async () => {
    await refresh();
  };

  return {
    refreshTags,
    tags,
  };
};
