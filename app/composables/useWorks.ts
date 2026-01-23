export const useWorks = async () => {
  const { data: works, pending } = await useAsyncData(
    "works-data",
    async () => {
      const data = await queryCollection("works").all();

      const processedWorks = data
        ? data.map((item) => {
            let id = "";
            let link = "";

            if (item.id) {
              const match = item.id.match(/^.*\/(\d+)\.(.+)\.json$/);
              if (match) {
                id = match[1] || "";
                link = match[2] || "";
              }
            }

            return {
              ...item,
              id,
              link,
            };
          })
        : [];

      // 根據數字排序：由大到小（最新的在前）
      return processedWorks.sort((a, b) => Number(b.id) - Number(a.id));
    },
  );

  const worksByCategory = computed(() => {
    if (!works.value) return { vision: [], ui: [], web: [] };

    return {
      vision: works.value.filter((work) => work.category === "vision"),
      ui: works.value.filter((work) => work.category === "ui"),
      web: works.value.filter((work) => work.category === "web"),
    };
  });

  return {
    works,
    pending,
    worksByCategory,
  };
};
