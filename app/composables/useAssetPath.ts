export const useAssetPath = () => {
  const config = useRuntimeConfig();
  // 需要動態相對路徑才使用
  const getAssetPath = (src: string | null): string => {
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
    const baseURL =
      config.public.GITHUB_ACTIONS === "true" ? "/2025_mandy-website" : "";

    // 確保路徑以 / 開頭
    const cleanSrc = src.startsWith("/") ? src : `/${src}`;
    return `${baseURL}${cleanSrc}`;
  };

  return {
    getAssetPath,
  };
};
