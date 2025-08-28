import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("date-format", {
    mounted(el, binding) {
      const time = dayjs(binding.value).format("YYYY/MM/DD HH:mm");
      el.innerText = time;
    },
  });
});
