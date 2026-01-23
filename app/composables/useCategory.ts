export const useCategory = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data: categories, refresh } = await useAsyncData(
    `category-${collection}-data`,
    async () => {
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .select("category")
        .all();
      if (!data) return [];

      // 處理重複與限制數量
      const categories = data.map((item) => item.category);
      const uniqueCategories = Array.from(new Set(categories));
      if (limit) {
        return uniqueCategories.slice(0, limit);
      }
      return uniqueCategories;
    },
  );

  const refreshCategories = async () => {
    await refresh();
  };

  return {
    refreshCategories,
    categories,
  };
};
