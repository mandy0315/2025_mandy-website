export const getAssetPath = (src: string | null): string => {
  if (!src) return "";

  // 如果已經是完整 URL，直接返回
  if (src.startsWith("http") || src.startsWith("//")) {
    return src;
  }

  const config = useRuntimeConfig();
  const baseURL = config.public.BASE_URL;

  // 清除前面有斜線的
  const cleanSrc = src.replace(/^\/+/, "");
  return `${baseURL}${cleanSrc}`;
};
