// composables/useScrollToTarget.ts
export const useScrollToTarget = (targetValue: Ref<string>) => {
  const containerRef = ref<HTMLElement | null>(null);
  const targetRefs = ref<HTMLElement[]>([]);

  onBeforeUpdate(() => {
    targetRefs.value = [];
  });

  const scrollToTarget = () => {
    if (targetRefs.value.length === 0 || !containerRef.value) {
      console.log("元素或容器不存在");
      return;
    }

    const targetElement = targetRefs.value.find((el) => {
      const text = el.innerText.trim().toLowerCase();
      const target = targetValue.value.toLowerCase();
      return text === target;
    });

    if (targetElement) {
      containerRef.value.scrollTo({
        top: targetElement.offsetTop - 40,
        behavior: "instant",
      });
    } else {
      console.log("沒有找到匹配的元素，目標值:", targetValue.value);
    }
  };

  const initScrollToTarget = async () => {
    await nextTick();
    setTimeout(() => scrollToTarget(), 500);
  };

  return {
    containerRef,
    targetRefs,
    initScrollToTarget,
  };
};
