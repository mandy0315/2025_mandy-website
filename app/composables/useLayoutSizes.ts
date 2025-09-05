export const useLayoutSizes = () => {
  const headerHeight = useState("headerHeight", () => 0);
  const footerHeight = useState("footerHeight", () => 0);
  const isFooterInView = useState("isFooterInView", () => false);

  const setFooterObserver = (footerElement: HTMLElement) => {
    // 監聽可見性
    const isFooterVisible = useElementVisibility(footerElement);

    // 監聽高度
    const { height } = useElementSize(footerElement);

    // 更新全域狀態
    watch(
      isFooterVisible,
      (visible) => {
        isFooterInView.value = visible;
      },
      { immediate: true }
    );

    watch(
      height,
      (newHeight) => {
        footerHeight.value = newHeight;
      },
      { immediate: true }
    );
  };

  const setHeaderObserver = (headerElement: HTMLElement) => {
    const { height } = useElementSize(headerElement);

    watch(
      height,
      (newHeight) => {
        headerHeight.value = newHeight;
      },
      { immediate: true }
    );
  };

  // 計算側邊欄高度
  const sidebarHeightCalc = computed(() => {
    if (isFooterInView.value) {
      return `calc(100vh - ${headerHeight.value}px - ${footerHeight.value}px)`;
    } else {
      return `calc(100vh - ${headerHeight.value}px)`;
    }
  });

  return {
    headerHeight,
    footerHeight,
    isFooterInView,
    sidebarHeightCalc,
    setFooterObserver,
    setHeaderObserver,
  };
};
