export const useCategory = async (type: "posts" | "notes" = "posts") => {
  const router = useRouter();
  const categories = useState<string[]>("categories", () => []);

  const goToCategoriesPage = (category: string) => {
    const path = encodeURI(`/categories-${type}/${category}`);
    router.push(path);
  };

  const { data: categoriesData, refresh } = await useAsyncData(
    `category-${type}`,
    async () => {
      return await queryCollection(type)
        .order("date", "DESC")
        .select("categories")
        .all();
    }
  );

  const setCategories = async (limit?: number) => {
    categories.value = [];
    try {
      await refresh();
      const selectItemInList = await queryCollection(type)
        .order("date", "DESC")
        .select("categories")
        .all();

      if (!categoriesData.value) {
        categoriesData.value = [];
      }

      let selectedCategories = categoriesData.value
        .map((item) => item.categories)
        .flat();

      if (limit) {
        selectedCategories = selectedCategories.slice(0, limit);
      }

      const uniqueCategories = Array.from(new Set(selectedCategories));
      categories.value = uniqueCategories;
    } catch (error) {
      console.error("取得分類錯誤", error);
    }
  };

  return {
    goToCategoriesPage,
    setCategories,
    categories,
  };
};
