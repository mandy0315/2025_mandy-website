export const useImageObserver = () => {
  const imgRefs = ref<HTMLImageElement[]>([]);
  const observer = ref<IntersectionObserver | null>(null);
  const visibleImages = ref<Set<number>>(new Set());
  const loadedImages = ref<Set<number>>(new Set());

  const resetImageRefsState = () => {
    imgRefs.value = [];
    observer.value = null;
    visibleImages.value.clear();
    loadedImages.value.clear();
  };

  const loadSingleImage = (img: HTMLImageElement, index: number) => {
    const dataSrc = img.getAttribute("data-src");

    if (!dataSrc) return;

    img.src = dataSrc;
    img.style.opacity = "1";
    loadedImages.value.add(index);
  };

  const loadImagesSequentially = () => {
    const unloadedIndexes = Array.from(visibleImages.value)
      .filter((index) => !loadedImages.value.has(index))
      .sort((a, b) => a - b);

    unloadedIndexes.forEach((index, position) => {
      const img = imgRefs.value[index];
      if (!img) return;

      const delay = position * 200; // 只對可見圖片計算延遲

      if (img) {
        setTimeout(() => {
          loadSingleImage(img, index);
        }, delay);
      }
    });
  };

  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    let hasNewVisibleImages = false;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const index = Number(img.getAttribute("data-index"));

        // 可見圖片沒有就加入集合
        if (!visibleImages.value.has(index)) {
          visibleImages.value.add(index);
          hasNewVisibleImages = true;
        }

        observer.value?.unobserve(img);
      }
    });

    if (hasNewVisibleImages) {
      loadImagesSequentially();
    }
  };

  const initObserver = () => {
    if (observer.value) return;

    observer.value = new IntersectionObserver(onIntersection);

    // 監聽所有圖片元素
    imgRefs.value.forEach((img) => {
      if (img) observer.value?.observe(img);
    });
  };
  const disconnectedObserver = () => {
    observer.value?.disconnect();
    observer.value = null;
  };

  return {
    imgRefs,
    initObserver,
    disconnectedObserver,
    resetImageRefsState,
  };
};
