export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path) || "";
  const collectionMatch = path.match(/^\/(blog|notes)\//);
  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const { setCategories, categories } = await useCategory(collection);
  setCategories();

  const categoryParam = String(to.params?.category || "");
  // 沒有 category 並有分類列表，重定向到第一個分類
  if (categoryParam === "" && categories.value.length > 0) {
    return navigateTo(`/${collection}/categories/${categories.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }
  // 分類裡沒有該分類
  if (categoryParam && !categories.value.includes(categoryParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category Not Found",
      fatal: true,
    });
  }
});
