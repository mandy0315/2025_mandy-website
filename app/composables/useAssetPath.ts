export const useAssetPath = () => {
  const getImagePath = (src: string): string => {
    if (!src) return "";

    // 如果已經是完整 URL，直接返回
    if (src.startsWith("http") || src.startsWith("//")) {
      return src;
    }

    // 如果在 GitHub Actions 環境，加上 baseURL 前綴
    const baseURL =
      process.env.GITHUB_ACTIONS === "true" ? "/2025_mandy-website" : "";

    // 確保路徑以 / 開頭
    const cleanSrc = src.startsWith("/") ? src : `/${src}`;

    return `${baseURL}${cleanSrc}`;
  };

  return {
    getImagePath,
  };
};
