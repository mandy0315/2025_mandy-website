interface UsePageSEO {
  title?: string;
  description?: string;
}
export const usePageSEO = ({ title = "", description = "" }: UsePageSEO) => {
  const getTitle = (titleInput = "") => {
    return titleInput ? `${titleInput} - MandySpace` : "MandySpace";
  };
  const getDescription = (descriptionInput = "") => {
    return descriptionInput
      ? descriptionInput
      : "Hello～我是 Mandy！歡迎來到我的小天地 ✨ 這裡收藏著我的開發與設計作品、學習筆記、生活與技術文章，希望能與你分享我的所見所想～";
  };

  const fullTitle = computed(() => getTitle(title));
  const fullDescription = computed(() => getDescription(description));

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: fullDescription,
    ogDescription: fullDescription,
  });
};
