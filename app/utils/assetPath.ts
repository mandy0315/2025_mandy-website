export const getAssetPath = (src: string | null): string => {
  if (!src) return "";

  // 如果已經是完整 URL，直接返回
  if (
    src.startsWith("http") ||
    src.startsWith("//") ||
    src.startsWith("/2025_mandy-website")
  ) {
    return src;
  }

  // 如果在 GitHub Actions 環境，加上 baseURL 前綴
  const config = useRuntimeConfig();
  const baseURL = config.public.BASE_URL;

  // 清除前面有斜線的
  const cleanSrc = src.replace(/^\/+/, "");
  return `${baseURL}${cleanSrc}`;
};
