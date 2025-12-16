export const useWorks = async () => {
  const { data, pending } = await useAsyncData("works-data", async () => {
    return queryCollection("works").order("stem", "DESC").all();
  });
  const allWorks = computed(() => {
    return data.value
      ? data.value.map((item) => ({
          ...item,
          id: item.id
            ? item.id.replace(/^.*\/\d+\.(.+)\.json$/, "$1")
            : item.id,
        }))
      : [];
  });
  const worksByCategory = computed(() => {
    if (!allWorks.value) return { vision: [], ui: [], web: [] };

    return {
      vision: allWorks.value.filter((work) => work.category === "vision"),
      ui: allWorks.value.filter((work) => work.category === "ui"),
      web: allWorks.value.filter((work) => work.category === "web"),
    };
  });

  return {
    allWorks,
    pending,
    worksByCategory,
  };
};
