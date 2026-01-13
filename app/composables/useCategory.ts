export const useCategory = async (collection: "blog" | "notes" = "blog") => {
  const categories = useState<string[]>(`categories-${collection}`, () => []);

  const cleanCategory = (category: string) => {
    // 去空白、全小寫、處理特殊字符
    return category
      .trim() // 去除前後空白
      .toLowerCase() // 轉小寫
      .replace(/\s+/g, "-") // 空白轉為連字符
      .replace(/[^\w\u4e00-\u9fff-]/g, ""); // 只保留字母、數字、中文、連字符
  };

  const goToCategoriesPage = async (category: string) => {
    await navigateTo(`/${collection}/categories/${cleanCategory(category)}`);
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
      categories.value = [];
      return;
    }

    let selectedCategories: string[] = categoriesData.value.map(
      (item) => item.category
    ); // 取得物件的 category 欄位的值

    selectedCategories = Array.from(new Set(selectedCategories)); // 篩選掉重複的
    selectedCategories = selectedCategories.map((category) =>
      cleanCategory(category)
    );
    if (limit) {
      selectedCategories = selectedCategories.slice(0, limit);
    }

    categories.value = selectedCategories;
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
    cleanCategory,
  };
};
