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

  const loadImagesSequentially = () => {
    const unloadedImages = Array.from(visibleImages.value)
      .filter((index) => !loadedImages.value.has(index))
      .sort((a, b) => a - b);

    unloadedImages.forEach((index, position) => {
      const img = imgRefs.value[index];
      const src = img?.getAttribute("data-src");
      if (img) {
        setTimeout(() => {
          const defaultSrc = "/images/default-image.jpg";
          img.src = src || defaultSrc;
          console.log(img.src);
          img.style.opacity = "1";
          loadedImages.value.add(index);
        }, position * 200); // 只對可見圖片計算延遲
      }
    });
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    let hasNewVisible = false;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const index = Number(img.getAttribute("data-index"));

        if (!visibleImages.value.has(index)) {
          visibleImages.value.add(index);
          hasNewVisible = true;
        }

        observer.value?.unobserve(img);
      }
    });

    if (hasNewVisible) {
      loadImagesSequentially();
    }
  };

  const initObserver = () => {
    observer.value = new IntersectionObserver(handleIntersection);
    imgRefs.value.forEach((img) => {
      if (img) observer.value?.observe(img);
    });
  };
  const disconnectedObserver = () => {
    observer.value?.disconnect();
  };

  return {
    imgRefs,
    initObserver,
    disconnectedObserver,
    resetImageRefsState,
  };
};
