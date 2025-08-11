export const useNavigation = async (
  collection: "blog" | "notes",
  currentPath: string
) => {
  type NavigationItem = {
    title: string;
    path: string;
    description: string;
  };
  const { data } = await useAsyncData(`navigation-${collection}`, async () => {
    return await queryCollection(collection)
      .order("date", "DESC")
      .select("title", "path", "description")
      .all();
  });
  const prevData = computed(() => {
    if (!data.value || !data.value.length) return null;

    const index = data.value.findIndex(
      (item: NavigationItem) => item.path === currentPath
    );
    console.log("test", index);
    if (index === -1 || index === 0) return null;
    return data.value[index - 1];
  });
  const nextData = computed(() => {
    if (!data.value || !data.value.length) return null;

    const index = data.value.findIndex(
      (item: NavigationItem) => item.path === currentPath
    );
    if (index === -1 || index === data.value.length - 1) return null;
    return data.value[index + 1];
  });
  return {
    prevData,
    nextData,
  };
};
