import type { Collection } from "@/types";
export const usePostDetail = (collection: Collection, path: string) => {
  return useAsyncData(path, () => {
    return queryCollection(collection).path(path).first();
  });
};
