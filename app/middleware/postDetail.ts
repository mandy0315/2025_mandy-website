export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path).replace(/\/$/, "") || "";
  const collectionMatch = path.match(/^\/(blog|notes)\//);
  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const getAllPosts = async () => {
    try {
      return await queryCollection(collection).all();
    } catch (error) {
      console.error("取得所有文章錯誤", error);
      return [];
    }
  };
  const allPosts = await getAllPosts();
  const post = allPosts.find((post) => post.path === path);
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: `Post Not Found: ${path}`,
      fatal: true,
    });
  }
});
