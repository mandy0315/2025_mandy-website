export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path) || "";
  const collectionMatch = path.match(/^\/(blog|notes)\//);
  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const { setTags, tags } = await useTag(collection);
  setTags();

  const tagParam = String(to.params?.tag || "");
  // 網址沒有標籤顯示但有標籤列表，重定向到第一個標籤
  if (tagParam === "" && tags.value.length > 0) {
    return navigateTo(`/${collection}/tags/${tags.value[0]}`, {
      replace: true, // 使用 replace 以避免在歷史記錄中留下重定向
    });
  }
  // 網址有標籤，但標籤列表中沒有該標籤
  if (tagParam && !tags.value.includes(tagParam)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tag Not Found",
      fatal: true,
    });
  }
});
