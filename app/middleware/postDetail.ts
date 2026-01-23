export default defineNuxtRouteMiddleware(async (to) => {
  // 只處理文章詳細頁面的路徑格式
  const path = String(to.path).replace(/\/$/, "") || "";
  const collectionMatch = path.match(/^\/(blog|notes)\/(.+)$/);

  // 如果不是文章詳細頁面格式，直接跳過
  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";
  // 在路由守衛中驗證文章是否存在
  const { data: post, error } = await useAsyncData(`post-check-${path}`, () =>
    queryCollection(collection).path(path).first(),
  );
  if (error.value) {
    console.error("資料查詢錯誤:", error);
    return navigateTo(`/${collection}`);
  }
  if (!post.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `文章未找到: ${path}`,
      fatal: true,
    });
  }
});
