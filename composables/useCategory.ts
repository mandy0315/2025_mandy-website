export const useCategory = async (collection: "blog" | "notes" = "blog") => {
  const categories = useState<string[]>(`categories-${collection}`, () => []);

  const goToCategoriesPage = async (category: string) => {
    await navigateTo(`/${collection}/categories/${category}`);
  };

  const { data: categoriesData, refresh } = await useAsyncData(
    `category-${collection}-data`,
    async () => {
      return await queryCollection(collection)
        .order("date", "DESC")
        .select("category")
        .all();
    }
  );

  const setCategories = (limit?: number) => {
    if (!categoriesData.value) {
      categoriesData.value = [];
    }

    let selectedCategories = categoriesData.value
      .map((item) => item.category)
      .flat();

    if (limit) {
      selectedCategories = selectedCategories.slice(0, limit);
    }

    const uniqueCategories = Array.from(new Set(selectedCategories));
    categories.value = uniqueCategories;
  };

  const refreshCategories = async (limit?: number) => {
    categories.value = [];
    try {
      await refresh();

      setCategories(limit);
    } catch (error) {
      console.error("取得分類錯誤", error);
    }
  };

  return {
    goToCategoriesPage,
    refreshCategories,
    setCategories,
    categories,
  };
};
