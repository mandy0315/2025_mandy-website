export const useNavListener = () => {
  const currSection = ref("");
  const parentSection = ref<Window | HTMLElement>(window);
  const navList = ref<
    {
      title: string;
      element: HTMLElement | null;
    }[]
  >([]);
  const isListening = ref(false);

  const calcScrollVals = () => {
    let scrollTop = 0;
    let pageScreenHeight = 0;
    let pageHeight = 0;

    if (parentSection.value === window) {
      scrollTop = window.scrollY;
      pageScreenHeight = window.innerHeight;
      pageHeight = document.documentElement.scrollHeight;
    } else {
      const section = parentSection.value as HTMLElement;
      scrollTop = section.scrollTop;
      pageScreenHeight = section.clientHeight;
      pageHeight = section.scrollHeight;
    }

    const bufferHeight = pageScreenHeight * 0.8;
    return { scrollTop, pageScreenHeight, bufferHeight, pageHeight };
  };

  const setCurrSection = () => {
    const { scrollTop, pageScreenHeight, bufferHeight, pageHeight } =
      calcScrollVals();

    let nav = "";
    for (const item of navList.value) {
      if (!item.element) continue;

      // 判斷目前位置
      if (
        scrollTop + pageScreenHeight - bufferHeight >=
        item.element.offsetTop
      ) {
        nav = item.title;
      }

      // 判斷滑到底部
      if (scrollTop === pageHeight - pageScreenHeight) {
        const lastNav = item.title;
        nav = lastNav;
      }
      // 判斷滑到頂部
      if (scrollTop === 0) {
        const firstNav =
          navList.value.find((item) => item.element)?.title || "";
        nav = firstNav;
      }
    }
    currSection.value = nav;
  };

  const setNavListener = ({
    parent,
    navs,
  }: {
    parent?: HTMLElement;
    navs: {
      title: string;
      element: HTMLElement | null;
    }[];
  }) => {
    if (parent) {
      parentSection.value = parent as HTMLElement;
    }
    navList.value = navs;

    // 判斷 navList 空值與有監聽過，解除監聽與離開 initNavListener
    if (navList.value.length === 0) {
      if (isListening.value) {
        parentSection.value.removeEventListener("scroll", setCurrSection);
        isListening.value = false;
      }
      return;
    }

    // 預設值
    if (!isListening.value) {
      const findFirstElement = navList.value.find((item) => item.element);
      currSection.value = findFirstElement?.title || "";

      parentSection.value.addEventListener("scroll", setCurrSection);
      isListening.value = true;
    }
  };

  onUnmounted(() => {
    if (isListening.value && parentSection.value) {
      parentSection.value.removeEventListener("scroll", setCurrSection);
    }
  });

  return {
    currSection,
    setNavListener,
    navList,
  };
};
