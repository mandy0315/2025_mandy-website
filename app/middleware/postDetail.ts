export default defineNuxtRouteMiddleware(async (to) => {
  const path = String(to.path).replace(/\/$/, "") || "";
  const collectionMatch = path.match(/^\/(blog|notes)\//);
  if (!collectionMatch) return;
  const collection = collectionMatch[1] as "blog" | "notes";

  const { allPosts } = await usePosts(collection);
  console.log("allPosts", allPosts.value, "path", path);
  const post = allPosts.value?.find((post) => post.path === path);
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: `Post Not Found: ${path}`,
      fatal: true,
    });
  }
});
