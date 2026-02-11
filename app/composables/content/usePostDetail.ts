export const usePostDetail = (collection: "blog" | "notes", path: string) => {
  return useAsyncData(path, () => {
    return queryCollection(collection).path(path).first();
  });
};
