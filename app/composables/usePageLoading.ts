export const usePageLoading = () => {
  const progress = useState<number>("progress", () => 0);
  const isLoading = useState<boolean>("isLoading", () => false);

  // 進度條設定
  const TOTAL_PROGRESS = 100; // 總進度 100%
  const ADD_PROGRESS = 1; // 每次增加 1%

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let renderStart = performance.now();

  /** 計算頁面載入時長 */
  const calcDuration = () => {
    const MIN_LOADING_TIME = 400; // 最短 400 ms 載入時間
    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStart;

    return Math.max(renderDuration, MIN_LOADING_TIME);
  };

  /** 計算每次更新間隔 */
  const calcTimeInterval = (duration: number) =>
    Math.round(duration / (TOTAL_PROGRESS / ADD_PROGRESS));

  /** 完成進度並關閉 */
  const finishProgress = () => {
    // 延遲 300ms 讓使用者看到 100%
    timeoutId = setTimeout(() => {
      clearLoading();
      isLoading.value = false;
    }, 300);
  };

  /** 遞增進度條 */
  const incrementProgress = (timeInterval: number) => {
    const updateProgress = () => {
      if (progress.value < TOTAL_PROGRESS) {
        progress.value += ADD_PROGRESS;
        timeoutId = setTimeout(updateProgress, timeInterval);
      } else {
        finishProgress();
      }
    };

    updateProgress();
  };

  const clearLoading = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const startLoading = () => {
    // 重設狀態
    clearLoading();
    renderStart = performance.now();
    progress.value = 0;
    isLoading.value = true;

    const duration = calcDuration();
    const timeInterval = calcTimeInterval(duration);
    incrementProgress(timeInterval);
  };

  return {
    progress,
    isLoading,
    startLoading,
  };
};
