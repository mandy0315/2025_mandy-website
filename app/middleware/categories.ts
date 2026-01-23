export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path).replace(/\/$/, "") || "";
  const collectionMatch = path.match(/^\/(blog|notes)\/(.+)$/);

  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const { categories } = await useCategory(collection);
  if (!categories.value) return;

  const categoryParam = decodeURIComponent(String(to.params?.category || ""));
  // 分類參數是空字串，重定向到第一個分類
  if (categoryParam === "" && categories.value.length > 0) {
    return navigateTo(`/${collection}/categories/${categories.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }
  // 分類列表裡沒有該分類
  if (!categories.value.includes(categoryParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: `列表未找到：${categoryParam}`,
      fatal: true,
    });
  }
});
