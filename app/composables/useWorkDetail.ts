export const useWorkDetail = (path: string, slug: string) => {
  return useAsyncData(path, () => {
    return queryCollection("works").where("stem", "LIKE", `%${slug}`).first();
  });
};
