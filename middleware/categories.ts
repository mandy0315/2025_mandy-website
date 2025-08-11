export default defineNuxtRouteMiddleware(async (to, from) => {
  const path = String(to.path || "");
  const pathName = path
    .match(/\/categories-(blog|notes)/)?.[0]
    ?.replace("/", "");

  const pathParam = String(to.params?.category || "").trim();

  if (!pathName) {
    showError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }
  const type = pathName === "categories-blog" ? "blog" : "notes";
  const { setCategories, categories } = await useCategory(type);
  await setCategories();

  // 如果沒有 category 參數，重定向到第一個分類
  if (!pathParam && categories.value.length > 0) {
    return navigateTo(`/categories-${type}/${categories.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }

  // 如果有 category 參數但不在有效分類中
  if (pathParam && !categories.value.includes(pathParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category Not Found",
    });
  }
});
