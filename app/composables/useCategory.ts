export const useCategory = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  // 取所有分類，不含限制
  const { data: categorieData, refresh } = await useAsyncData(
    "category-data",
    async () => {
      const data = await queryCollection(collection)
        .order("date", "DESC")
        .select("category")
        .all();
      if (!data) return [];

      // 處理重複
      const categories = data.map((item) => item.category);
      const uniqueCategories = Array.from(new Set(categories));
      return uniqueCategories;
    },
  );

  const categories = computed(() => {
    if (!categorieData.value) return [];
    // 判斷是否處理限制數量
    if (limit) {
      return categorieData.value.slice(0, limit);
    }
    return categorieData.value;
  });

  return {
    refresh,
    categories,
  };
};
