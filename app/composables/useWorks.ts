export const useWorks = async () => {
  const { data: allWorks, pending } = await useAsyncData(
    "works-data",
    async () => {
      const data = await queryCollection("works").order("stem", "DESC").all();
      const newWorks = data
        ? data.map((item) => ({
            ...item,
            id: item.id
              ? item.id.replace(/^.*\/\d+\.(.+)\.json$/, "$1")
              : item.id,
          }))
        : [];
      return newWorks;
    }
  );
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
