export const usePageLoading = () => {
  const minLoadingTime = 2000;
  const minRenderDuration = 300;
  const progress = useState<number>("progress", () => 0);
  const isLoading = useState<boolean>("isLoading", () => true);
  const toggleStartLoading = useState<boolean>(
    "toggleStartLoading",
    () => false
  );
  let timeoutId: ReturnType<typeof setTimeout>;
  let renderStart: number;

  const resetRenderStart = () => {
    renderStart = performance.now();
  };

  const clearLoading = () => {
    timeoutId && clearTimeout(timeoutId);
    isLoading.value = false;
    progress.value = 0;
  };

  const startLoading = () => {
    clearLoading();

    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStart;
    console.log("renderDuration", renderDuration);
    const totalProgress = 100;
    const addProgress = 10;

    if (renderDuration < minRenderDuration) {
      console.log("Loading time is too short, skipping loading.");
      clearLoading();
      return;
    }

    progress.value = 0;
    isLoading.value = true;
    const duration =
      renderDuration < minLoadingTime ? minLoadingTime : renderDuration;

    const time = Math.round(duration / (totalProgress / addProgress));

    const incrementProgress = () => {
      if (progress.value < totalProgress) {
        progress.value += addProgress;
        timeoutId = setTimeout(incrementProgress, time);
      } else {
        clearLoading();
      }
    };

    incrementProgress();
  };

  return {
    resetRenderStart,
    progress,
    isLoading,
    startLoading,
    clearLoading,
    toggleStartLoading,
  };
};
