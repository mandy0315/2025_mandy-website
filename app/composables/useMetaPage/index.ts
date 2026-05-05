import type { UseMetaPage } from "./types";
export const useMetaPage = ({ title, description, path = "" }: UseMetaPage) => {
  const runtimeConfig = useRuntimeConfig();
  const site = runtimeConfig.public.SITE_URL + path;

  useSeoMeta({
    author: "蔡敏佳 Mandy",
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: site,
    twitterTitle: title,
    twitterDescription: description,
  });
};
