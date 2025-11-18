export const useLayoutSizes = () => {
  const headerHeight = useState("headerHeight", () => 0);
  const footerHeight = useState("footerHeight", () => 0);
  const isFooterInView = useState("isFooterInView", () => false);

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
  };
};
