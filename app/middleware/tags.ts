export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path).replace(/\/$/, "") || "";
  const collectionMatch = path.match(/^\/(blog|notes)\/(.+)$/);

  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const { tags } = await useTag(collection);

  const tagParam = decodeURIComponent(String(to.params?.tag || ""));
  // 標籤參數是空字串(預設)，重定向到第一個標籤
  if (tagParam === "" && tags.value.length > 0) {
    return navigateTo(`/${collection}/tags/${tags.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }
  // 標籤列表中沒有該標籤
  if (!tags.value.includes(tagParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: `列表未找到：${tagParam}`,
      fatal: true,
    });
  }
});
