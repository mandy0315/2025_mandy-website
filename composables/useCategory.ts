export const useCategory = (type: "posts" | "notes" = "posts") => {
  const router = useRouter();
  const categories = useState<string[]>("categories", () => []);

  const goToCategoriesPage = (category: string) => {
    const path = encodeURI(`/categories-${type}/${category}`);
    router.push(path);
  };

  const setCategories = async (limit?: number) => {
    categories.value = [];
    try {
      const selectItemInList = await queryCollection(type)
        .order("date", "DESC")
        .select("categories")
        .all();

      let selectedCategories = selectItemInList
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

  const getCategories = async (limit?: number) => {
    try {
      const selectItemInList = await queryCollection(type)
        .order("date", "DESC")
        .select("categories")
        .all();

      let categories = selectItemInList.map((item) => item.categories).flat();

      if (limit) {
        categories = categories.slice(0, limit);
      }

      const uniqueCategories = Array.from(new Set(categories));
      return uniqueCategories;
    } catch (error) {
      console.error("取得分類錯誤", error);
      return [];
    }
  };

  return {
    goToCategoriesPage,
    getCategories,
    setCategories,
    categories,
  };
};
