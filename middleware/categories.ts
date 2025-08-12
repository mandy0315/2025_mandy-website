export default defineNuxtRouteMiddleware(async (to, from) => {
  const path = String(to.path) || "";
  const collectionMatch =
    path.match(/\/(blog|notes)/)?.[0]?.replace("/", "") || "";
  if (collectionMatch === "") {
    showError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }
  const collection = collectionMatch as "blog" | "notes";
  const { setCategories, categories } = await useCategory(collection);
  setCategories();

  const category = String(to.params?.category || "");
  console.log(categories.value, category);
  // 沒有 category 並有分類列表，重定向到第一個分類
  if (category === "" && categories.value.length > 0) {
    return navigateTo(`/${collection}/categories/${categories.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }
  // 分類裡沒有該分類
  if (category && !categories.value.includes(category)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category Not Found",
    });
  }
});
