import { expect, it, describe } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ColorModel from "./ColorModel.vue";

describe("ColorModel Component", () => {
  it("can also mount an app", async () => {
    const component = await mountSuspended(ColorModel, {
      shallow: true,
    });
    expect(component.html()).toMatchInlineSnapshot(`"<base-button-stub disabled="false" variant="base" isaction="false" class="relative mt-1 lg:mt-0.5" title="color-mode_dark"></base-button-stub>"`);
  });
});
