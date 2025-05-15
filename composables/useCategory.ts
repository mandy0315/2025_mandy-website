export const useCategory = (type: "posts" | "notes" = "posts") => {
  const router = useRouter();

  const goToCategoriesPage = (category: string) => {
    const path = encodeURI(`/categories-${type}/${category}`);
    router.push(path);
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

  return { goToCategoriesPage, getCategories };
};
