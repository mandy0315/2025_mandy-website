interface UsePageSEO {
  title?: string;
  description?: string;
  path: string;
}
export const usePageSEO = ({
  title = "",
  description = "",
  path,
}: UsePageSEO) => {
  const defaultTitle = "MandySpace";
  const titleTxt = computed(() =>
    title === "" ? defaultTitle : `${title} - ${defaultTitle}`,
  );

  const defaultDescription =
    "Hello～我是 Mandy！歡迎來到我的小天地 ✨ 這裡收藏著我的開發與設計作品、學習筆記、生活與技術文章，希望能與你分享我的所見所想～";
  const descriptionTxt = computed(() =>
    description === "" ? defaultDescription : description,
  );

  useSeoMeta({
    author: "蔡敏佳 Mandy",
    title: titleTxt.value,
    description: descriptionTxt.value,
    ogTitle: title || defaultTitle,
    ogDescription: descriptionTxt.value,
    ogUrl: path,
    twitterTitle: title || defaultTitle,
    twitterDescription: descriptionTxt.value,
  });

  defineOgImageComponent("CustomTemplate", {
    title: title || defaultTitle,
    description: descriptionTxt.value,
  });
};
