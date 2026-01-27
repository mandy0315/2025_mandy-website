/** 尋找目標滾動到那裡 */

export const useScrollToTarget = () => {
  const containerRef = ref<HTMLElement | null>(null);
  const targetRefs = ref<HTMLElement[]>([]);

  onBeforeUpdate(() => {
    targetRefs.value = [];
  });

  const findAndScroll = (target: string) => {
    if (targetRefs.value.length === 0 || !containerRef.value) {
      console.log("元素或容器不存在");
      return;
    }

    const targetElement = targetRefs.value.find((el) => {
      const text = el.innerText.trim().toLowerCase();
      const targetLower = target.toLowerCase();
      return text === targetLower;
    });

    if (targetElement) {
      containerRef.value.scrollTo({
        top: targetElement.offsetTop - 40,
        behavior: "instant",
      });
    } else {
      console.log("沒有找到匹配的元素，目標值:", target);
    }
  };

  const scrollTo = async (target: string) => {
    await nextTick();
    setTimeout(() => findAndScroll(target), 500);
  };

  return {
    containerRef,
    targetRefs,
    scrollTo,
  };
};
