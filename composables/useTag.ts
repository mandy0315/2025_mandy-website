export const useTag = async (collection: "blog" | "notes" = "blog") => {
  const tags = useState<string[]>(`tags-${collection}`, () => []);

  const goToTagsPage = async (tag: string) => {
    await navigateTo(`/${collection}/tags/${tag}`);
  };

  const { data: tagsData, refresh } = await useAsyncData(
    `${collection}-tag-list`,
    async () => {
      return await queryCollection(collection)
        .order("date", "DESC")
        .select("tags")
        .all();
    }
  );

  const setTags = (limit?: number) => {
    if (!tagsData.value) {
      tagsData.value = [];
      tags.value = [];
      return;
    }

    let selectedTags: string[] = tagsData.value.map((item) => item.tags).flat(); // 取得物件的 category 欄位的值並扁平化陣列
    selectedTags = selectedTags.map((tag) => tag.toLowerCase()); // 陣列裡的字串全部轉小寫
    selectedTags = Array.from(new Set(selectedTags)); // 篩選掉重複的

    if (limit) {
      selectedTags = selectedTags.slice(0, limit);
    }

    tags.value = selectedTags;
  };

  const refreshTags = async (limit?: number) => {
    tags.value = [];
    try {
      await refresh();

      setTags(limit);
    } catch (error) {
      console.error("取得標籤錯誤", error);
    }
  };

  return {
    goToTagsPage,
    refreshTags,
    setTags,
    tags,
  };
};
