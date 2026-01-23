export const useCategory = async (
  collection: "blog" | "notes" = "blog",
  limit?: number,
) => {
  const { data, refresh } = await useAsyncData(
    `category-${collection}-data`,
    () => {
      return queryCollection(collection)
        .order("date", "DESC")
        .select("category")
        .all();
    },
  );

  const categories = computed(() => {
    if (!data.value) return [];
    const categories = data.value.map((item) => item.category);
    const uniqueCategories = Array.from(new Set(categories));

    if (limit) {
      return uniqueCategories.slice(0, limit);
    }
    return uniqueCategories;
  });

  const refreshCategories = async () => {
    await refresh();
  };

  return {
    refreshCategories,
    categories,
  };
};
